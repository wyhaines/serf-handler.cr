module SerfHandler
  struct Event
    getter name : String = ""
    getter type : Symbol
    getter payload : String

    def initialize(
      @type = env_serf_event || :query,
      name : String = nil?,
      @payload = STDIN.read.strip
    )
      @name = name || (
        @type == :query ? ENV["SERF_QUERY_NAME"] : ENV["SERF_USER_EVENT"]
      )

      @type = :event if @type == :user
    end

    def env_serf_event : Nil | Symbol
      return nil if !ENV.has_key?("SERF_EVENT")

      case ENV["SERF_EVENT"].downcase
      when "user", "event"
        :event
      when "query"
        :query
      else
        nil
      end
    end
  end
end
