require "./spec_helper"

describe SerfHandler::Event do
  it "parses the event type from the environment" do
    SerfHandler::Event.env_serf_event(
      env: {"SERF_EVENT" => "user"}
    ).should eq :event
    SerfHandler::Event.env_serf_event(
      env: {"SERF_EVENT" => "event"}
    ).should eq :event
    SerfHandler::Event.env_serf_event(
      env: {"SERF_EVENT" => "query"}
    ).should eq :query
  end

  it "creates an event with reasonable defaults" do
    event = SerfHandler::Event.new(payload: "payload")
    event.type.should eq :query
    event.name.should eq ""
    event.payload.should eq "payload"
  end

  it "creates an event when given specific args" do
    event = SerfHandler::Event.new(
      type: :event,
      name: "test",
      payload: "NA"
    )
    event.type.should eq :event
    event.name.should eq "test"
    event.payload.should eq "NA"
  end

  it "creates an event where the name comes from the environment" do
    event = SerfHandler::Event.new(
      type: :query,
      payload: "STILL NA",
      env: {
        "SERF_QUERY_NAME" => "load-avg"
      }
    )
    event.type.should eq :query
    event.name.should eq "load-avg"
    event.payload.should eq "STILL NA"

    event = SerfHandler::Event.new(
      type: :event,
      payload: "STILL NA",
      env: {
        "SERF_USER_EVENT" => "deploy"
      }
    )
    event.type.should eq :event
    event.name.should eq "deploy"
    event.payload.should eq "STILL NA"
  end

end
