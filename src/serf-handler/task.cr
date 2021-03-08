module SerfHandler
  struct Task
    include Comparable(Task)

    getter order : Int32
    getter type : Symbol
    getter name : String?
    getter description : String
    getter task : Proc(SerfHandler::Event, String?)

    def initialize(
      @type = :query,
      @name = nil,
      @order = 0,
      @description = "",
      &@task : SerfHandler::Event -> String?
    )
    end

    def <=>(another_task)
      if @order < another_task.order
        -1
      elsif @order > another_task.order
        1
      else
        if @task.to_s < another_task.task.to_s
          -1
        elsif @task.to_s > another_task.task.to_s
          1
        else
          0
        end
      end
    end

    def call(*args)
      @task.call(*args) if @task
    end

    def to_named_tuple
      {
        "order"       => @order,
        "type"        => @type,
        "name"        => @name,
        "description" => @description,
        "task"        => @task,
      }
    end

    def to_h
      to_named_tuple.to_h
    end

    def self.from_h(hsh)
      order = hsh["order"] if hsh.has_key?("order")
      type = hsh["type"] if hsh.has_key?("type")
      name = hsh["name"] if hsh.has_key?("name")
      description = hsh["description"] if hsh.has_key?("description")
      task = hsh["task"] if hsh.has_key?("task")
      self.new(order: order, type: type, name: name, description: description, task: task)
    end
  end
end
