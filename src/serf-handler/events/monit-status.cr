include SerfHandler

describe "If monit is running on the system, extract all current",
  "status information and return it as CSV data."

on :query, "monit-status" do |event|
  data = `monit status`
  chunks = data.scan(/(?:System|Process|Filesystem).*?\n\n/m).map(&.to_a)

  fields = [%w(field data)]
  chunks.each do |chunk|
    chunk.each do |lines|
      lines.to_s.split("\n").each do |line|
        next if line.empty?
        fields << line.to_s.strip.split(/\s+/, 2)
      end
    end
  end

  String.build do |str|
    fields.each do |line|
      str << line.map { |field| "\"#{field}\"" }.join(",")
      str << "\n"
    end
  end
end
