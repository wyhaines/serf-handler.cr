module SerfHandler
  struct Event
    getter name : String
    getter type : Symbol
    getter payload : String

    def initialize(
      @type = Event.env_serf_event || :query,
      name : String? = nil,
      @payload = STDIN.gets_to_end.strip,
      env = ENV
    )
      @name = name || (
        @type == :query ?
          env["SERF_QUERY_NAME"]?.to_s :
          env["SERF_USER_EVENT"]?.to_s
      )
      @type = :event if @type == :user
    end

    def self.env_serf_event(env = ENV) : Nil | Symbol
      return nil if !env.has_key?("SERF_EVENT")

      case env["SERF_EVENT"].downcase
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
