require "./serf-handler/*"

require "json"

module SerfHandler
  class Mem
    class_property desc : String = ""
    class_property event : SerfHandler::Event?
  end

  Tasks = TaskList.new

  def describe(*strings)
    last_line = ""
    description = String.build do |str|
      strings.each do |line|
        if !last_line.empty? && last_line[-1] !~ /\s/ && line[0] !~ /\s/
          str << " #{line}"
        else
          str << line
        end
        last_line = line
      end
    end

    Mem.desc = description
  end

  def on(type = :query, name = nil, order = 0, &block : SerfHandler::Event -> String?)
    type = :event if type == :user
    type ||= :query

    desc = Mem.desc
    Mem.desc = ""
    Tasks << Task.new(type, name, order, desc, &block)
  end

  def self.run
    result = run_tasks

    if result && !result.empty?
      STDOUT.write (result.size > 1 ? result.to_json : result.first.to_s).to_slice
    end
  end

  def self.event
    unless Mem.event
      config = SerfHandler::Cli.new
      Mem.event = SerfHandler::Event.new(
        type: config["type"].as(Symbol),
        name: config["name"].as(String),
        payload: config["payload"].as(String)
      )
    end

    Mem.event.not_nil!
  end

  # def self.find_serf_handler_directories
  #   sources = [] of String
  #   sources << File.join(Dir.pwd,".serf-handler")
  #   sources << File.join(Dir.home, ".serf-handler") if Dir.home rescue nil
  #   sources << "/etc/serf/handlers/.serf-handler"
  #   sources.select {|s| FileTest.exist?(s)}
  # end

  def self.run_tasks
    result = [] of String?
    Tasks.sort.each do |task|
      next if task.type && task.type != event.type
      begin
        if task.type == :event && (task.name.to_s.empty? || task.name.to_s == event.name.to_s)
          task.call event
        elsif task.type == :query && (task.name.to_s.empty? || task.name.to_s == event.name.to_s)
          result << task.call(event)
        end
      rescue e : Exception
        result << "ERROR: #{e}"
      end
    end

    result
  end
end

require "./serf-handler/events/*"

SerfHandler.run
