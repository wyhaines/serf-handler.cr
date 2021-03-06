include SerfHandler

describe "Takes the name of a handler and returns its description. If there are",
  "multiple handlers with the same name, all matching results will be",
  "returned."

on :query, "describe-handler" do |event|
  name = event.payload.strip
  String.build do |str|
    SerfHandler::Tasks.select do |task|
      name == task.name
    end.each do |task|
      str << "#{task.description}\n"
    end
  end
end
