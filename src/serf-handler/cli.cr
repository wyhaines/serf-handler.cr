require "option_parser"

module SerfHandler
  class Cli < Hash(String, String | Symbol)
    def initialize
      super

      self["type"] = :query
      self["name"] = "list-handlers"
      self["payload"] = ""

      OptionParser.new do |opts|
        opts.banner = "serf-handler v#{SerfHandler::VERSION}\n\nUsage: serf-handler [options]\n\nWhen given CLI options, payload items that are normally passed to the handler via Serf can be specified manually."
        opts.separator ""
        opts.on("-t", "--type [TYPE]", "The type of request to trigger -- a query or an event. Defaults to an event.") do |type|
          if type == "query"
            self["type"] = :query
          elsif type == "event" || type == "user"
            self["type"] = :event
          else
            raise ArgumentError.new("Unknown type #{type}")
          end
        end
        opts.on("-n", "--name [NAME]", "The name of the query or event to trigger.") do |name|
          self["name"] = name
        end
        opts.on("-p", "--payload [PAYLOAD]", "The payload to deliver to the event handler that processes the request.") do |payload|
          self["payload"] = payload.to_s
        end
        opts.on("-v", "--version", "Output #{self.class.version_string}") do
          puts self.class.version_string
          exit
        end
        opts.on("-h", "--help", "Show this help") do
          puts opts
          exit
        end
        opts.invalid_option do |flag|
          STDERR.puts "Error: #{flag} is not a valid option.\n-----"
          STDERR.puts opts
          exit(1)
        end
      end.parse
    end

    def self.version_string
      "serf-handler v#{SerfHandler::VERSION}-crystal"
    end
  end
end
