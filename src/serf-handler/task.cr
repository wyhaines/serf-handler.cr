module SerfHandler
  struct Task
    include Comparable(Task)

    getter order : Int32 = 0
    getter type : Symbol = :query
    getter name : String? = nil
    getter description : String = ""
    getter task : Proc(SerfHandler::Event, String?)

    def initialize(@type, @name, @order, @description, &@task : SerfHandler::Event -> String?)
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
  end
end
