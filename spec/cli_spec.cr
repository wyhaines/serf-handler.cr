require "./spec_helper"

describe SerfHandler::Cli do
  it "returns a version string" do
    SerfHandler::Cli.version_string.should match(/serf-handler v#{SerfHandler::VERSION}-crystal/)
  end

  it "has reasonable defaults" do
    config = SerfHandler::Cli.new

    config["type"].should eq :query
    config["name"].should eq "list-handlers"
    config["payload"].should eq ""
  end

  it "accepts query type" do
    ARGV.replace(%w(-t query))
    config = SerfHandler::Cli.new

    config["type"].should eq :query
  end

  it "accepts event type" do
    ARGV.replace(%w(-t event))
    config = SerfHandler::Cli.new

    config["type"].should eq :event
  end

  it "accepts user type" do
    ARGV.replace(%w(-t user))
    config = SerfHandler::Cli.new

    config["type"].should eq :event
  end

  it "accepts a payload value" do
    ARGV.replace(%w(-p test))
    config = SerfHandler::Cli.new

    config["payload"].should eq "test"
  end

  it "accepts an arbitrary name" do
    ARGV.replace(%w(-n xyzzy))
    config = SerfHandler::Cli.new

    config["name"].should eq "xyzzy"
  end
end
