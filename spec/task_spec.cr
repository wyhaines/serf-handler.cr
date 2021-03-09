require "./spec_helper"

describe SerfHandler::Task do
  it "has reasonable defaults" do
    task = SerfHandler::Task.new { |x| }
    nt = task.to_named_tuple

    nt["order"].should eq 0
    nt["type"].should eq :query
    nt["name"].should eq nil
    nt["description"].should eq ""
  end

  it "can take arbitrary values for all attributes" do
    task = SerfHandler::Task.new(
      order: 3,
      type: :event,
      name: "The Siege of Pale",
      description: "..."
    ) { |x| }
    nt = task.to_named_tuple

    nt["order"].should eq 3
    nt["type"].should eq :event
    nt["name"].should eq "The Siege of Pale"
    nt["description"].should eq "..."
  end

  it "can access order" do
    task = SerfHandler::Task.new(
      order: 3,
      type: :event,
      name: "The Siege of Pale",
      description: "..."
    ) { |x| }

    task.order.should eq 3
  end

  it "can access type" do
    task = SerfHandler::Task.new(
      order: 3,
      type: :event,
      name: "The Siege of Pale",
      description: "..."
    ) { |x| }

    task.type.should eq :event
  end

  it "can access name" do
    task = SerfHandler::Task.new(
      order: 3,
      type: :event,
      name: "The Siege of Pale",
      description: "..."
    ) { |x| }

    task.name.should eq "The Siege of Pale"
  end

  it "can access description" do
    task = SerfHandler::Task.new(
      order: 3,
      type: :event,
      name: "The Siege of Pale",
      description: "..."
    ) { |x| }

    task.description.should eq "..."
  end

  it "can access task" do
    task = SerfHandler::Task.new(
      order: 3,
      type: :event,
      name: "The Siege of Pale",
      description: "..."
    ) { |x| }

    task.task.is_a?(Proc).should be_true
  end

  it "allows it's task to be executed" do
    task = SerfHandler::Task.new { |x| "7"}
    event = SerfHandler::Event.new(payload: "")
    task.call(event).should eq "7"
  end

  it "allows to tasks to be compared" do
    a = SerfHandler::Task.new(order: 7) { |x| "7"}
    b = SerfHandler::Task.new(order: 3) { |x| "3"}
    c = SerfHandler::Task.new(order: 7) { |x| "1"}

    (a <=> b).should eq 1
    (b <=> a).should eq -1  
    (c <=> c).should eq 0
  end
end
