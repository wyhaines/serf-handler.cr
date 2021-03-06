include SerfHandler

describe "Return current memory and swap status as a csv"

on :query, "freemem" do |event|
  begin
    data = `free -ht`.chomp
    lines = data.split("\n").map { |line| line.split(/\s+/) }
    maxlength = lines.map { |l| l.size }.max
    lines = Array(Array(String)).new(lines.size) { Array(String).new(maxlength) { "" } }
    data.split("\n").map { |line| line.split(/\s+/) }
      .each_with_index do |line, pos|
        line.each_with_index do |field, inner_pos|
          lines[pos][inner_pos] = field
        end
      end
    String.build do |str|
      output = lines.map do |line|
        str << Array(String).new(maxlength) { |_| "" }
          .zip(line)
          .map do |pair|
            pair.to_a.sort_by { |item| item }
              .last
          end
          .map { |item| "\"#{item}\"" }
          .join(",")
        str << "\n"
      end
    end
  rescue e : Exception
    pp e
    pp e.backtrace
    raise e
  end
end
