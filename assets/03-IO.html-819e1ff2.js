const n=JSON.parse('{"key":"v-734f98c7","path":"/GoLang/Base/03-IO.html","title":"03-IO和文件操作","lang":"zh-CN","frontmatter":{"title":"03-IO和文件操作","date":"2022-02-27T23:31:42.000Z","category":"GoLang","tag":["GoLang","IO","File","Time"],"description":"概述 这里主要过下 GoLang 中的 IO 还有文件以及时间库对应的操作 文件 打开和读取 整体思路还是和其他语言包差不多的，就是这 err...比较折磨人 package main import ( \\"fmt\\" \\"os\\" ) func main() { fileObject, err := os.Open(\\"./main.go\\") if err != nil { fmt.Printf(\\"发生了异常，%v\\\\n\\", err) return } //文件的关闭操作 defer func(fileObject *os.File) { err := fileObject.Close() if err != nil { // 关闭出现了错误，不处理 } fmt.Println(\\"关闭文件成功\\") }(fileObject) // 读取文件 //1. 指定文件读取长度 var tmp [128]byte read, err := fileObject.Read(tmp[:]) if err != nil { fmt.Printf(\\"文件读取出错%v\\\\n\\", err) } fmt.Printf(\\"读取了%d个字节，内容为：%s\\\\n\\", read, tmp) }","head":[["meta",{"property":"og:url","content":"http://www.amayakite.github.io/GoLang/Base/03-IO.html"}],["meta",{"property":"og:site_name","content":"Amayakite Blogs"}],["meta",{"property":"og:title","content":"03-IO和文件操作"}],["meta",{"property":"og:description","content":"概述 这里主要过下 GoLang 中的 IO 还有文件以及时间库对应的操作 文件 打开和读取 整体思路还是和其他语言包差不多的，就是这 err...比较折磨人 package main import ( \\"fmt\\" \\"os\\" ) func main() { fileObject, err := os.Open(\\"./main.go\\") if err != nil { fmt.Printf(\\"发生了异常，%v\\\\n\\", err) return } //文件的关闭操作 defer func(fileObject *os.File) { err := fileObject.Close() if err != nil { // 关闭出现了错误，不处理 } fmt.Println(\\"关闭文件成功\\") }(fileObject) // 读取文件 //1. 指定文件读取长度 var tmp [128]byte read, err := fileObject.Read(tmp[:]) if err != nil { fmt.Printf(\\"文件读取出错%v\\\\n\\", err) } fmt.Printf(\\"读取了%d个字节，内容为：%s\\\\n\\", read, tmp) }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-17T12:51:48.000Z"}],["meta",{"property":"article:author","content":"Amayakite"}],["meta",{"property":"article:tag","content":"GoLang"}],["meta",{"property":"article:tag","content":"IO"}],["meta",{"property":"article:tag","content":"File"}],["meta",{"property":"article:tag","content":"Time"}],["meta",{"property":"article:published_time","content":"2022-02-27T23:31:42.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-17T12:51:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"03-IO和文件操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-27T23:31:42.000Z\\",\\"dateModified\\":\\"2023-06-17T12:51:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amayakite\\",\\"url\\":\\"https://github.com/Amayakite\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"文件","slug":"文件","link":"#文件","children":[{"level":3,"title":"打开和读取","slug":"打开和读取","link":"#打开和读取","children":[]},{"level":3,"title":"Buffer 读取文件","slug":"buffer-读取文件","link":"#buffer-读取文件","children":[]},{"level":3,"title":"使用 ioUtil 来读取文件","slug":"使用-ioutil-来读取文件","link":"#使用-ioutil-来读取文件","children":[]},{"level":3,"title":"写入文件","slug":"写入文件","link":"#写入文件","children":[]},{"level":3,"title":"Buffer 写入文件","slug":"buffer-写入文件","link":"#buffer-写入文件","children":[]},{"level":3,"title":"使用 IoUtil 来写入文件","slug":"使用-ioutil-来写入文件","link":"#使用-ioutil-来写入文件","children":[]},{"level":3,"title":"获取用户输入","slug":"获取用户输入","link":"#获取用户输入","children":[]},{"level":3,"title":"文件的其他相关操作","slug":"文件的其他相关操作","link":"#文件的其他相关操作","children":[]}]},{"level":2,"title":"时间操作","slug":"时间操作","link":"#时间操作","children":[{"level":3,"title":"基本操作和格式化时间输出","slug":"基本操作和格式化时间输出","link":"#基本操作和格式化时间输出","children":[]},{"level":3,"title":"时间戳相关","slug":"时间戳相关","link":"#时间戳相关","children":[]},{"level":3,"title":"时间间隔","slug":"时间间隔","link":"#时间间隔","children":[]},{"level":3,"title":"时间时区","slug":"时间时区","link":"#时间时区","children":[]},{"level":3,"title":"时间操作","slug":"时间操作-1","link":"#时间操作-1","children":[]},{"level":3,"title":"定时器","slug":"定时器","link":"#定时器","children":[]},{"level":3,"title":"时间格式化和解析时间-概述","slug":"时间格式化和解析时间-概述","link":"#时间格式化和解析时间-概述","children":[]},{"level":3,"title":"格式化时间","slug":"格式化时间","link":"#格式化时间","children":[]},{"level":3,"title":"解析字符串格式时间","slug":"解析字符串格式时间","link":"#解析字符串格式时间","children":[]},{"level":3,"title":"时间处理常用","slug":"时间处理常用","link":"#时间处理常用","children":[]}]}],"git":{"createdTime":1687006308000,"updatedTime":1687006308000,"contributors":[{"name":"Amayakite","email":"amayakite@qq.com","commits":1}]},"readingTime":{"minutes":14.39,"words":4316},"filePathRelative":"GoLang/Base/03-IO.md","localizedDate":"2022年2月27日","excerpt":"<h2> 概述</h2>\\n<p>这里主要过下 GoLang 中的 IO 还有文件以及时间库对应的操作</p>\\n<h2> 文件</h2>\\n<h3> 打开和读取</h3>\\n<p>整体思路还是和其他语言包差不多的，就是这 err...比较折磨人</p>\\n<div class=\\"language-go line-numbers-mode\\" data-ext=\\"go\\"><pre class=\\"language-go\\"><code><span class=\\"token keyword\\">package</span> main\\n\\n<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">(</span>\\n  <span class=\\"token string\\">\\"fmt\\"</span>\\n  <span class=\\"token string\\">\\"os\\"</span>\\n<span class=\\"token punctuation\\">)</span>\\n\\n<span class=\\"token keyword\\">func</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  fileObject<span class=\\"token punctuation\\">,</span> err <span class=\\"token operator\\">:=</span> os<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Open</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"./main.go\\"</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token keyword\\">if</span> err <span class=\\"token operator\\">!=</span> <span class=\\"token boolean\\">nil</span> <span class=\\"token punctuation\\">{</span>\\n    fmt<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"发生了异常，%v\\\\n\\"</span><span class=\\"token punctuation\\">,</span> err<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">return</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token comment\\">//文件的关闭操作</span>\\n  <span class=\\"token keyword\\">defer</span> <span class=\\"token keyword\\">func</span><span class=\\"token punctuation\\">(</span>fileObject <span class=\\"token operator\\">*</span>os<span class=\\"token punctuation\\">.</span>File<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    err <span class=\\"token operator\\">:=</span> fileObject<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Close</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">if</span> err <span class=\\"token operator\\">!=</span> <span class=\\"token boolean\\">nil</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token comment\\">//    关闭出现了错误，不处理</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    fmt<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"关闭文件成功\\"</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">(</span>fileObject<span class=\\"token punctuation\\">)</span>\\n\\n  <span class=\\"token comment\\">//    读取文件</span>\\n  <span class=\\"token comment\\">//1. 指定文件读取长度</span>\\n  <span class=\\"token keyword\\">var</span> tmp <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">128</span><span class=\\"token punctuation\\">]</span><span class=\\"token builtin\\">byte</span>\\n\\n  read<span class=\\"token punctuation\\">,</span> err <span class=\\"token operator\\">:=</span> fileObject<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Read</span><span class=\\"token punctuation\\">(</span>tmp<span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">:</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token keyword\\">if</span> err <span class=\\"token operator\\">!=</span> <span class=\\"token boolean\\">nil</span> <span class=\\"token punctuation\\">{</span>\\n    fmt<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"文件读取出错%v\\\\n\\"</span><span class=\\"token punctuation\\">,</span> err<span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  fmt<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"读取了%d个字节，内容为：%s\\\\n\\"</span><span class=\\"token punctuation\\">,</span> read<span class=\\"token punctuation\\">,</span> tmp<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};