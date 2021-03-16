include SerfHandler

describe "Return a hearbeat from the system with the amount of time that it",
  "has been up."

on :query, "ping" do |_event|
  `/usr/bin/uptime`.sub(/^.*(up\s+.*?),\s*\d+\s+user.*?\n?$/, "\\1") + "\n"
end
