include SerfHandler

describe "Provide a list of all available handlers."

on :query, "list-handlers" do |_event|
  r = String.build do |str|
    SerfHandler::Tasks.each do |task|
      str << "#{task.type}: #{task.name}\n"
    end
  end

  r
end
