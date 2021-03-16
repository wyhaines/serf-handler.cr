include SerfHandler

describe "Return the 1-minute, 5-minute, and 15-minute load averages as a",
  "comma separated list of values."

on :query, "load-average" do |_event|
  data = `uptime`.match(/\s*(\d+:\d+:\d+)\s+up\s+(.*?),\s*(\d+\s+\w+),\s*load\s+average:\s+([\d\.]+),\s*([\d\.]+),\s*([\d\.]+)/)
  data = Array(String).new(6) { "" } if data.nil?
  <<-ECSV
  "time","uptime","users","1 minute load","5 minute load","15 minute load"
  #{data[1..6].map { |d| "\"#{d}\"" }.join(",")}\n
  ECSV
end
