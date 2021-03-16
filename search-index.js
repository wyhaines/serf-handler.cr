crystal_doc_search_index_callback({"repository_name":"serf-handler","body":"# serf-handler\n\n![SplayTreeMap CI](https://img.shields.io/github/workflow/status/wyhaines/serf-handler.cr/Serf-Handler.cr%20CI?style=for-the-badge&logo=GitHub)\n[![GitHub release](https://img.shields.io/github/release/wyhaines/serf-handler.cr.svg?style=for-the-badge)](https://github.com/wyhaines/serf-handler.cr/releases)\n![GitHub commits since latest release (by SemVer)](https://img.shields.io/github/commits-since/wyhaines/serf-handler.cr/latest?style=for-the-badge)\nTODO: Write a description here\n\n## Installation\n\n1. Add the dependency to your `shard.yml`:\n\n   ```yaml\n   dependencies:\n     serf-handler:\n       github: your-github-user/serf-handler\n   ```\n\n2. Run `shards install`\n\n## Usage\n\n```crystal\nrequire \"serf-handler\"\n```\n\nTODO: Write usage instructions here\n\n## Development\n\nTODO: Write development instructions here\n\n## Contributing\n\n1. Fork it (<https://github.com/your-github-user/serf-handler/fork>)\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Add some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create a new Pull Request\n\n## Contributors\n\n- [Kirk Haines](https://github.com/your-github-user) - creator and maintainer\n\n![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wyhaines/serf-handler.cr?style=for-the-badge)\n![GitHub issues](https://img.shields.io/github/issues/wyhaines/serf-handler.cr?style=for-the-badge)","program":{"html_id":"serf-handler/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[{"html_id":"serf-handler/SerfHandler","kind":"module","full_name":"SerfHandler","name":"SerfHandler"}],"locations":[],"repository_name":"serf-handler","program":true,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[{"html_id":"serf-handler/SerfHandler","kind":"module","full_name":"SerfHandler","name":"SerfHandler"}],"extended_modules":[{"html_id":"serf-handler/SerfHandler","kind":"module","full_name":"SerfHandler","name":"SerfHandler"}],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"serf-handler/SerfHandler","path":"SerfHandler.html","kind":"module","full_name":"SerfHandler","name":"SerfHandler","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"serf-handler","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[{"id":"Tasks","name":"Tasks","value":"TaskList.new","doc":null,"summary":null},{"id":"VERSION","name":"VERSION","value":"\"1.1.2\"","doc":null,"summary":null}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[{"id":"event-class-method","html_id":"event-class-method","name":"event","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/serf-handler.cr","line_number":46,"url":null},"def":{"name":"event","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"if Mem.event\nelse\n  config = SerfHandler::Cli.new\n  Mem.event = SerfHandler::Event.new(type: config[\"type\"].as(Symbol), name: config[\"name\"].as(String), payload: config[\"payload\"].as(String))\nend\nMem.event.not_nil!\n"}},{"id":"run-class-method","html_id":"run-class-method","name":"run","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/serf-handler.cr","line_number":38,"url":null},"def":{"name":"run","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"result = run_tasks\nif result && (!result.empty?)\n  STDOUT.write((result.size > 1 ? result.to_json : result.first.to_s).to_slice)\nend\n"}},{"id":"run_tasks-class-method","html_id":"run_tasks-class-method","name":"run_tasks","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/serf-handler.cr","line_number":67,"url":null},"def":{"name":"run_tasks","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"result = [] of String | ::Nil\nTasks.sort.each do |task|\n  if task.type && (task.type != event.type)\n    next\n  end\n  begin\n    if (task.type == (:event)) && (task.name.to_s.empty? || (task.name.to_s == event.name.to_s))\n      task.call(event)\n    else\n      if (task.type == (:query)) && (task.name.to_s.empty? || (task.name.to_s == event.name.to_s))\n        result << (task.call(event))\n      end\n    end\n  rescue e : Exception\n    result << \"ERROR: #{e}\"\n  end\nend\nresult\n"}}],"constructors":[],"instance_methods":[{"id":"describe(*strings)-instance-method","html_id":"describe(*strings)-instance-method","name":"describe","doc":null,"summary":null,"abstract":false,"args":[{"name":"strings","doc":null,"default_value":"","external_name":"strings","restriction":""}],"args_string":"(*strings)","args_html":"(*strings)","location":{"filename":"src/serf-handler.cr","line_number":13,"url":null},"def":{"name":"describe","args":[{"name":"strings","doc":null,"default_value":"","external_name":"strings","restriction":""}],"double_splat":null,"splat_index":0,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"last_line = \"\"\ndescription = String.build do |str|\n  strings.each do |line|\n    if ((!last_line.empty?) && (last_line[-1] !~ (/\\s/))) && (line[0] !~ (/\\s/))\n      str << \" #{line}\"\n    else\n      str << line\n    end\n    last_line = line\n  end\nend\nMem.desc = description\n"}},{"id":"on(type=:query,name=nil,order=0,&block:SerfHandler::Event->String?)-instance-method","html_id":"on(type=:query,name=nil,order=0,&block:SerfHandler::Event->String?)-instance-method","name":"on","doc":null,"summary":null,"abstract":false,"args":[{"name":"type","doc":null,"default_value":":query","external_name":"type","restriction":""},{"name":"name","doc":null,"default_value":"nil","external_name":"name","restriction":""},{"name":"order","doc":null,"default_value":"0","external_name":"order","restriction":""}],"args_string":"(type = <span class=\"n\">:query</span>, name = <span class=\"n\">nil</span>, order = <span class=\"n\">0</span>, &block : SerfHandler::Event -> String?)","args_html":"(type = <span class=\"n\">:query</span>, name = <span class=\"n\">nil</span>, order = <span class=\"n\">0</span>, &block : <a href=\"SerfHandler/Event.html\">SerfHandler::Event</a> -> String?)","location":{"filename":"src/serf-handler.cr","line_number":29,"url":null},"def":{"name":"on","args":[{"name":"type","doc":null,"default_value":":query","external_name":"type","restriction":""},{"name":"name","doc":null,"default_value":"nil","external_name":"name","restriction":""},{"name":"order","doc":null,"default_value":"0","external_name":"order","restriction":""}],"double_splat":null,"splat_index":null,"yields":1,"block_arg":{"name":"block","doc":null,"default_value":"","external_name":"block","restriction":"(SerfHandler::Event -> String | ::Nil)"},"return_type":"","visibility":"Public","body":"if type == (:user)\n  type = :event\nend\ntype || (type = :query)\ndesc = Mem.desc\nMem.desc = \"\"\nTasks << (Task.new(type, name, order, desc, &block))\n"}}],"macros":[],"types":[{"html_id":"serf-handler/SerfHandler/Cli","path":"SerfHandler/Cli.html","kind":"class","full_name":"SerfHandler::Cli","name":"Cli","abstract":false,"superclass":{"html_id":"serf-handler/Hash","kind":"class","full_name":"Hash","name":"Hash"},"ancestors":[{"html_id":"serf-handler/Hash","kind":"class","full_name":"Hash","name":"Hash"},{"html_id":"serf-handler/Iterable","kind":"module","full_name":"Iterable","name":"Iterable"},{"html_id":"serf-handler/Enumerable","kind":"module","full_name":"Enumerable","name":"Enumerable"},{"html_id":"serf-handler/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"serf-handler/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[],"repository_name":"serf-handler","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"serf-handler/SerfHandler","kind":"module","full_name":"SerfHandler","name":"SerfHandler"},"doc":null,"summary":null,"class_methods":[{"id":"version_string-class-method","html_id":"version_string-class-method","name":"version_string","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/serf-handler/cli.cr","line_number":46,"url":null},"def":{"name":"version_string","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"\"serf-handler v#{SerfHandler::VERSION}-crystal\""}}],"constructors":[{"id":"new-class-method","html_id":"new-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/serf-handler/cli.cr","line_number":5,"url":null},"def":{"name":"new","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[],"macros":[],"types":[]},{"html_id":"serf-handler/SerfHandler/Event","path":"SerfHandler/Event.html","kind":"struct","full_name":"SerfHandler::Event","name":"Event","abstract":false,"superclass":{"html_id":"serf-handler/Struct","kind":"struct","full_name":"Struct","name":"Struct"},"ancestors":[{"html_id":"serf-handler/Struct","kind":"struct","full_name":"Struct","name":"Struct"},{"html_id":"serf-handler/Value","kind":"struct","full_name":"Value","name":"Value"},{"html_id":"serf-handler/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[],"repository_name":"serf-handler","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"serf-handler/SerfHandler","kind":"module","full_name":"SerfHandler","name":"SerfHandler"},"doc":null,"summary":null,"class_methods":[{"id":"env_serf_event(env=ENV):Symbol?-class-method","html_id":"env_serf_event(env=ENV):Symbol?-class-method","name":"env_serf_event","doc":null,"summary":null,"abstract":false,"args":[{"name":"env","doc":null,"default_value":"ENV","external_name":"env","restriction":""}],"args_string":"(env = <span class=\"t\">ENV</span>) : Symbol?","args_html":"(env = <span class=\"t\">ENV</span>) : Symbol?","location":{"filename":"src/serf-handler/event.cr","line_number":21,"url":null},"def":{"name":"env_serf_event","args":[{"name":"env","doc":null,"default_value":"ENV","external_name":"env","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Nil | Symbol","visibility":"Public","body":"if !(env.has_key?(\"SERF_EVENT\"))\n  return nil\nend\ncase env[\"SERF_EVENT\"].downcase\nwhen \"user\", \"event\"\n  :event\nwhen \"query\"\n  :query\nelse\n  nil\nend\n"}}],"constructors":[{"id":"new(type=Event.env_serf_event||(:query),name:String?=nil,payload=STDIN.gets_to_end.strip,env=ENV)-class-method","html_id":"new(type=Event.env_serf_event||(:query),name:String?=nil,payload=STDIN.gets_to_end.strip,env=ENV)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"type","doc":null,"default_value":"Event.env_serf_event || (:query)","external_name":"type","restriction":""},{"name":"name","doc":null,"default_value":"nil","external_name":"name","restriction":"String | ::Nil"},{"name":"payload","doc":null,"default_value":"STDIN.gets_to_end.strip","external_name":"payload","restriction":""},{"name":"env","doc":null,"default_value":"ENV","external_name":"env","restriction":""}],"args_string":"(type = <span class=\"t\">Event</span>.env_serf_event || (<span class=\"n\">:query</span>), name : String? = <span class=\"n\">nil</span>, payload = <span class=\"t\">STDIN</span>.gets_to_end.strip, env = <span class=\"t\">ENV</span>)","args_html":"(type = <span class=\"t\">Event</span>.env_serf_event || (<span class=\"n\">:query</span>), name : String? = <span class=\"n\">nil</span>, payload = <span class=\"t\">STDIN</span>.gets_to_end.strip, env = <span class=\"t\">ENV</span>)","location":{"filename":"src/serf-handler/event.cr","line_number":7,"url":null},"def":{"name":"new","args":[{"name":"type","doc":null,"default_value":"Event.env_serf_event || (:query)","external_name":"type","restriction":""},{"name":"name","doc":null,"default_value":"nil","external_name":"name","restriction":"String | ::Nil"},{"name":"payload","doc":null,"default_value":"STDIN.gets_to_end.strip","external_name":"payload","restriction":""},{"name":"env","doc":null,"default_value":"ENV","external_name":"env","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(type, name, payload, env)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"name:String-instance-method","html_id":"name:String-instance-method","name":"name","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","args_html":" : String","location":{"filename":"src/serf-handler/event.cr","line_number":3,"url":null},"def":{"name":"name","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@name"}},{"id":"payload:String-instance-method","html_id":"payload:String-instance-method","name":"payload","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","args_html":" : String","location":{"filename":"src/serf-handler/event.cr","line_number":5,"url":null},"def":{"name":"payload","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@payload"}},{"id":"type:Symbol-instance-method","html_id":"type:Symbol-instance-method","name":"type","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Symbol","args_html":" : Symbol","location":{"filename":"src/serf-handler/event.cr","line_number":4,"url":null},"def":{"name":"type","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Symbol","visibility":"Public","body":"@type"}}],"macros":[],"types":[]},{"html_id":"serf-handler/SerfHandler/Mem","path":"SerfHandler/Mem.html","kind":"class","full_name":"SerfHandler::Mem","name":"Mem","abstract":false,"superclass":{"html_id":"serf-handler/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"serf-handler/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"serf-handler/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[],"repository_name":"serf-handler","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"serf-handler/SerfHandler","kind":"module","full_name":"SerfHandler","name":"SerfHandler"},"doc":null,"summary":null,"class_methods":[{"id":"desc:String-class-method","html_id":"desc:String-class-method","name":"desc","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","args_html":" : String","location":{"filename":"src/serf-handler.cr","line_number":7,"url":null},"def":{"name":"desc","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@@desc"}},{"id":"desc=(desc:String)-class-method","html_id":"desc=(desc:String)-class-method","name":"desc=","doc":null,"summary":null,"abstract":false,"args":[{"name":"desc","doc":null,"default_value":"","external_name":"desc","restriction":"String"}],"args_string":"(desc : String)","args_html":"(desc : String)","location":{"filename":"src/serf-handler.cr","line_number":7,"url":null},"def":{"name":"desc=","args":[{"name":"desc","doc":null,"default_value":"","external_name":"desc","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@@desc = desc"}},{"id":"event:SerfHandler::Event?-class-method","html_id":"event:SerfHandler::Event?-class-method","name":"event","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : SerfHandler::Event?","args_html":" : <a href=\"../SerfHandler/Event.html\">SerfHandler::Event</a>?","location":{"filename":"src/serf-handler.cr","line_number":8,"url":null},"def":{"name":"event","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"SerfHandler::Event | ::Nil","visibility":"Public","body":"@@event"}},{"id":"event=(event:SerfHandler::Event?)-class-method","html_id":"event=(event:SerfHandler::Event?)-class-method","name":"event=","doc":null,"summary":null,"abstract":false,"args":[{"name":"event","doc":null,"default_value":"","external_name":"event","restriction":"SerfHandler::Event | ::Nil"}],"args_string":"(event : SerfHandler::Event?)","args_html":"(event : <a href=\"../SerfHandler/Event.html\">SerfHandler::Event</a>?)","location":{"filename":"src/serf-handler.cr","line_number":8,"url":null},"def":{"name":"event=","args":[{"name":"event","doc":null,"default_value":"","external_name":"event","restriction":"SerfHandler::Event | ::Nil"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@@event = event"}}],"constructors":[],"instance_methods":[],"macros":[],"types":[]},{"html_id":"serf-handler/SerfHandler/Task","path":"SerfHandler/Task.html","kind":"struct","full_name":"SerfHandler::Task","name":"Task","abstract":false,"superclass":{"html_id":"serf-handler/Struct","kind":"struct","full_name":"Struct","name":"Struct"},"ancestors":[{"html_id":"serf-handler/Comparable","kind":"module","full_name":"Comparable","name":"Comparable"},{"html_id":"serf-handler/Struct","kind":"struct","full_name":"Struct","name":"Struct"},{"html_id":"serf-handler/Value","kind":"struct","full_name":"Value","name":"Value"},{"html_id":"serf-handler/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[],"repository_name":"serf-handler","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[{"html_id":"serf-handler/Comparable","kind":"module","full_name":"Comparable","name":"Comparable"}],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"serf-handler/SerfHandler","kind":"module","full_name":"SerfHandler","name":"SerfHandler"},"doc":null,"summary":null,"class_methods":[{"id":"from_h(hsh)-class-method","html_id":"from_h(hsh)-class-method","name":"from_h","doc":null,"summary":null,"abstract":false,"args":[{"name":"hsh","doc":null,"default_value":"","external_name":"hsh","restriction":""}],"args_string":"(hsh)","args_html":"(hsh)","location":{"filename":"src/serf-handler/task.cr","line_number":54,"url":null},"def":{"name":"from_h","args":[{"name":"hsh","doc":null,"default_value":"","external_name":"hsh","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"if hsh.has_key?(\"order\")\n  order = hsh[\"order\"]\nend\nif hsh.has_key?(\"type\")\n  type = hsh[\"type\"]\nend\nif hsh.has_key?(\"name\")\n  name = hsh[\"name\"]\nend\nif hsh.has_key?(\"description\")\n  description = hsh[\"description\"]\nend\nif hsh.has_key?(\"task\")\n  task = hsh[\"task\"]\nend\nself.new(order: order, type: type, name: name, description: description, task: task)\n"}}],"constructors":[{"id":"new(type=:query,name=nil,order=0,description=&quot;&quot;,&task:SerfHandler::Event->String?)-class-method","html_id":"new(type=:query,name=nil,order=0,description=&quot;&quot;,&task:SerfHandler::Event->String?)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"type","doc":null,"default_value":":query","external_name":"type","restriction":""},{"name":"name","doc":null,"default_value":"nil","external_name":"name","restriction":""},{"name":"order","doc":null,"default_value":"0","external_name":"order","restriction":""},{"name":"description","doc":null,"default_value":"\"\"","external_name":"description","restriction":""}],"args_string":"(type = <span class=\"n\">:query</span>, name = <span class=\"n\">nil</span>, order = <span class=\"n\">0</span>, description = <span class=\"s\">&quot;&quot;</span>, &task : SerfHandler::Event -> String?)","args_html":"(type = <span class=\"n\">:query</span>, name = <span class=\"n\">nil</span>, order = <span class=\"n\">0</span>, description = <span class=\"s\">&quot;&quot;</span>, &task : <a href=\"../SerfHandler/Event.html\">SerfHandler::Event</a> -> String?)","location":{"filename":"src/serf-handler/task.cr","line_number":11,"url":null},"def":{"name":"new","args":[{"name":"type","doc":null,"default_value":":query","external_name":"type","restriction":""},{"name":"name","doc":null,"default_value":"nil","external_name":"name","restriction":""},{"name":"order","doc":null,"default_value":"0","external_name":"order","restriction":""},{"name":"description","doc":null,"default_value":"\"\"","external_name":"description","restriction":""}],"double_splat":null,"splat_index":null,"yields":1,"block_arg":{"name":"task","doc":null,"default_value":"","external_name":"task","restriction":"(SerfHandler::Event -> String | ::Nil)"},"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(type, name, order, description, &task) do |_arg0|\n  yield _arg0\nend\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"(another_task)-instance-method","html_id":"(another_task)-instance-method","name":"<=>","doc":null,"summary":null,"abstract":false,"args":[{"name":"another_task","doc":null,"default_value":"","external_name":"another_task","restriction":""}],"args_string":"(another_task)","args_html":"(another_task)","location":{"filename":"src/serf-handler/task.cr","line_number":20,"url":null},"def":{"name":"<=>","args":[{"name":"another_task","doc":null,"default_value":"","external_name":"another_task","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"if @order < another_task.order\n  -1\nelse\n  if @order > another_task.order\n    1\n  else\n    if @task.to_s < another_task.task.to_s\n      -1\n    else\n      if @task.to_s > another_task.task.to_s\n        1\n      else\n        0\n      end\n    end\n  end\nend"}},{"id":"call(*args)-instance-method","html_id":"call(*args)-instance-method","name":"call","doc":null,"summary":null,"abstract":false,"args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"args_string":"(*args)","args_html":"(*args)","location":{"filename":"src/serf-handler/task.cr","line_number":36,"url":null},"def":{"name":"call","args":[{"name":"args","doc":null,"default_value":"","external_name":"args","restriction":""}],"double_splat":null,"splat_index":0,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"if @task\n  @task.call(*args)\nend"}},{"id":"description:String-instance-method","html_id":"description:String-instance-method","name":"description","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","args_html":" : String","location":{"filename":"src/serf-handler/task.cr","line_number":8,"url":null},"def":{"name":"description","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@description"}},{"id":"name:String?-instance-method","html_id":"name:String?-instance-method","name":"name","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String?","args_html":" : String?","location":{"filename":"src/serf-handler/task.cr","line_number":7,"url":null},"def":{"name":"name","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String | ::Nil","visibility":"Public","body":"@name"}},{"id":"order:Int32-instance-method","html_id":"order:Int32-instance-method","name":"order","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Int32","args_html":" : Int32","location":{"filename":"src/serf-handler/task.cr","line_number":5,"url":null},"def":{"name":"order","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Int32","visibility":"Public","body":"@order"}},{"id":"task:Proc(SerfHandler::Event,String?)-instance-method","html_id":"task:Proc(SerfHandler::Event,String?)-instance-method","name":"task","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Proc(SerfHandler::Event, String?)","args_html":" : Proc(<a href=\"../SerfHandler/Event.html\">SerfHandler::Event</a>, String?)","location":{"filename":"src/serf-handler/task.cr","line_number":9,"url":null},"def":{"name":"task","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Proc(SerfHandler::Event, String | ::Nil)","visibility":"Public","body":"@task"}},{"id":"to_h-instance-method","html_id":"to_h-instance-method","name":"to_h","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/serf-handler/task.cr","line_number":50,"url":null},"def":{"name":"to_h","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"to_named_tuple.to_h"}},{"id":"to_named_tuple-instance-method","html_id":"to_named_tuple-instance-method","name":"to_named_tuple","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/serf-handler/task.cr","line_number":40,"url":null},"def":{"name":"to_named_tuple","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"{\"order\" => @order, \"type\" => @type, \"name\" => @name, \"description\" => @description, \"task\" => @task}"}},{"id":"type:Symbol-instance-method","html_id":"type:Symbol-instance-method","name":"type","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : Symbol","args_html":" : Symbol","location":{"filename":"src/serf-handler/task.cr","line_number":6,"url":null},"def":{"name":"type","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Symbol","visibility":"Public","body":"@type"}}],"macros":[],"types":[]},{"html_id":"serf-handler/SerfHandler/TaskList","path":"SerfHandler/TaskList.html","kind":"class","full_name":"SerfHandler::TaskList","name":"TaskList","abstract":false,"superclass":{"html_id":"serf-handler/Array","kind":"class","full_name":"Array","name":"Array"},"ancestors":[{"html_id":"serf-handler/Array","kind":"class","full_name":"Array","name":"Array"},{"html_id":"serf-handler/Comparable","kind":"module","full_name":"Comparable","name":"Comparable"},{"html_id":"serf-handler/Indexable","kind":"module","full_name":"Indexable","name":"Indexable"},{"html_id":"serf-handler/Enumerable","kind":"module","full_name":"Enumerable","name":"Enumerable"},{"html_id":"serf-handler/Iterable","kind":"module","full_name":"Iterable","name":"Iterable"},{"html_id":"serf-handler/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"serf-handler/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[],"repository_name":"serf-handler","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"serf-handler/SerfHandler","kind":"module","full_name":"SerfHandler","name":"SerfHandler"},"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[]}]}]}})