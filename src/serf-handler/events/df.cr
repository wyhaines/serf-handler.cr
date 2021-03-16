include SerfHandler

describe "Return a comma separated table of filesystem information."

on :query, "df" do |_event|
  `/bin/df -h`.split(/\n/).map { |r| r.split.join(",").sub(/Mounted,on/, "Mounted on") }.join("\n")
end
