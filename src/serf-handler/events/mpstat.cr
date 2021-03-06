include SerfHandler

describe "Return a comma separated table of CPU performance information",
         "collected from mpstat."

on :query, "mpstat" do |event|
  r = `/usr/bin/mpstat`
    .split(/\n/)[2..-1].
    map {|r| r.split.join(",").sub(/,/," ")}
    .join("\n")
end
