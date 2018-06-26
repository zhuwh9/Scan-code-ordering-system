# REST API 设计规范

## URI格式规范

> URI的格式定义如下：  
URI = scheme "://" authority "/" path [ "?" query ] [ "#" fragment ] 

URL是URI的一个子集(一种具体实现)，对于REST API来说一个资源一般对应一个唯一的URI(URL)。在URI的设计中，需要遵循下列规则。

#### 分隔符"/"的使用

"/"分隔符一般用来对资源层级的划分。
对于REST API来说，"/"只是一个分隔符，并无其他含义。为了避免混淆，"/"不应该出现在URL的末尾。
> 例如下列地址表示同一资源：
> http://mine.cn/res/  
> http://mine.cn/res

REST API对URI资源的定义具有唯一性，一个资源对应一个唯一的地址。为了使接口保持清晰干净，如果访问到末尾包含 "/" 的地址，服务端应该301到没有 "/"的地址上。

#### URI中尽量使用连字符"-"代替下划线"_"的使用
连字符"-"一般用来分割URI中出现的字符串(单词)，来提高URI的可读性。使用下划线"_"来分割字符串(单词)可能会和链接的样式冲突重叠，而影响阅读性。

#### URI中统一使用小写字母
> 根据RFC3986定义，URI是对大小写敏感的，所以为了避免歧义，我们尽量用小写字符。但主机名(Host)和scheme（协议名称:http/ftp/...）对大小写是不敏感的。

#### URI中不要包含文件(脚本)的扩展名
.json等扩展名不应该出现，对于接口来说没有实际意义。如果是想对返回的数据内容格式标示的话，通过HTTP Header中的Content-Type字段更好一些。

## 资源原型

#### 文档(Document)
文档是资源的单一表现形式，可以理解为一个对象，或者数据库中的一条记录。在请求文档时，要么返回文档对应的数据，要么会返回一个指向另外一个资源(文档)的链接。
例如：
> http://api.soccer.restapi.org/leagues/seattle
http://api.soccer.restapi.org/leagues/seattle/teams/trebuchet http://api.soccer.restapi.org/leagues/seattle/teams/trebuchet/players/mike  

#### 集合(Collection)
集合可以理解为是资源的一个容器(目录)，我们可以向里面添加资源(文档)。
例如：
> http://api.soccer.restapi.org/leagues http://api.soccer.restapi.org/leagues/seattle/teams http://api.soccer.restapi.org/leagues/seattle/teams/trebuchet/players  

#### 仓库(Store)
仓库是客户端来管理的一个资源库，客户端可以向仓库中新增资源或者删除资源。客户端也可以批量获取到某个仓库下的所有资源。仓库中的资源对外的访问不会提供单独URI的，客户端在创建资源时候的URI除外。
例如：
> PUT /users/1234/favorites/alonso  

#### 控制器(Controller)
控制器资源模型，可以执行一个方法，支持参数输入，结果返回。 是为了除了标准操作:增删改查(CRUD)以外的一些逻辑操作。控制器(方法)一般定义子URI中末尾，并且不会有子资源(控制器)。
例如我们向用户重发ID为245743的消息：
> POST /alerts/245743/resend

## URI命名规范
- 文档(Document)类型的资源用名词(短语)单数命名
- 集合(Collection)类型的资源用名词(短语)复数命名
- 仓库(Store)类型的资源用名词(短语)复数命名
- 控制器(Controller)类型的资源用动词(短语)命名
- URI中有些字段可以是变量，在实际使用中可以按需替换
- CRUD的操作不要体现在URI中，HTTP协议中的操作符已经对CRUD做了映射。

## URI的query字段
在REST中,query字段一般作为查询的参数补充，也可以帮助标示一个唯一的资源。但需要注意的是，作为一个提供查询功能的URI，无论是否有query条件，我们都应该保证结果的唯一性，一个URI对应的返回数据是不应该被改变的(在资源没有修改的情况下)。HTTP中的缓存也可能缓存查询结果。
- Query参数可以作为Collection或Store类型资源的过滤条件来使用。
> GET /users //返回所有用户列表  
GET /users?role=admin //返回权限为admin的用户列表  

- Query参数可以作为Collection或Store资源列表分页标示使用。
> 如果是一个简单的列表操作，可以这样设计： 
GET /users?pageSize=25&pageStartIndex=50  
如果是一个复杂的列表或查询操作的话，我们可以为资源设计一个Collection，因为复杂查询可能会涉及比较多的参数，建议使用Post的方式传入，例如这样：
POST /users/search

## HTTP交互设计

#### HTTP请求方法的使用
- GET方法用来获取资源
- PUT方法可用来新增/更新Store类型的资源
- PUT方法可用来更新一个资源
- POST方法可用来创建一个资源
- POST方法可用来触发执行一个Controller类型资源
- DELETE方法用于删除资源

#### HTTP响应状态码的使用
- 200 (“OK”) 用于一般性的成功返回
- 200 (“OK”) 不可用于请求错误返回
- 201 (“Created”) 资源被创建
- 202 (“Accepted”) 用于Controller控制类资源异步处理的返回，仅表示请求已经收到。对于耗时比较久的处理，一般用异步处理来完成
- 204 (“No Content”) 此状态可能会出现在PUT、POST、DELETE的请求中，一般表示资源存在，但消息体中不会返回任何资源相关的状态或信息。
- 301 (“Moved Permanently”) 资源的URI被转移，需要使用新的URI访问
- 302 (“Found”) 不推荐使用，此代码在HTTP1.1协议中被303/307替代。我们目前对302的使用和最初HTTP1.0定义的语意是有出入的，应该只有在GET/HEAD方法下，客户端才能根据Location执行自动跳转，而我们目前的客户端基本上是不会判断原请求方法的，无条件的执行临时重定向
- 303 (“See Other”) 返回一个资源地址URI的引用，但不强制要求客户端获取该地址的状态(访问该地址)
- 304 (“Not Modified”) 有一些类似于204状态，服务器端的资源与客户端最近访问的资源版本一致，并无修改，不返回资源消息体。可以用来降低服务端的压力
- 307 (“Temporary Redirect”) 目前URI不能提供当前请求的服务，临时性重定向到另外一个URI。在HTTP1.1中307是用来替代早期HTTP1.0中使用不当的302
- 400 (“Bad Request”) 用于客户端一般性错误返回, 在其它4xx错误以外的错误，也可以使用400，具体错误信息可以放在body中
- 401 (“Unauthorized”) 在访问一个需要验证的资源时，验证错误
- 403 (“Forbidden”) 一般用于非验证性资源访问被禁止，例如对于某些客户端只开放部分API的访问权限，而另外一些API可能无法访问时，可以给予403状态
- 404 (“Not Found”) 找不到URI对应的资源
- 405 (“Method Not Allowed”) HTTP的方法不支持，例如某些只读资源，可能不支持POST/DELETE。但405的响应header中必须声明该URI所支持的方法
- 406 (“Not Acceptable”) 客户端所请求的资源数据格式类型不被支持，例如客户端请求数据格式为application/xml，但服务器端只支持application/json
- 409 (“Conflict”) 资源状态冲突，例如客户端尝试删除一个非空的Store资源
- 412 (“Precondition Failed”) 用于有条件的操作不被满足时
- 415 (“Unsupported Media Type”) 客户所支持的数据类型，服务端无法满足
- 500 (“Internal Server Error”) 服务器端的接口错误，此错误于客户端无关

## 原数据设计

#### HTTP Headers

- **Content-Type** 标示body的数据格式
- **Content-Length body** 数据体的大小，客户端可以根据此标示检验读取到的数据是否完整，也可以通过Header判断是否需要下载可能较大的数据体
- **Last-Modified** 用于服务器端的响应，是一个资源最后被修改的时间戳，客户端(缓存)可以根据此信息判断是否需要重新获取该资源
- **ETag** 服务器端资源版本的标示，客户端(缓存)可以根据此信息判断是否需要重新获取该资源，需要注意的是，ETag如果通过服务器随机生成，可能会存在多个主机对同一个资源产生不同ETag的问题
- **Store类型**的资源要支持有条件的PUT请求
- **Location** 在响应header中使用，一般为客户端感兴趣的资源URI,例如在成功创建一个资源后，我们可以把新的资源URI放在Location中，如果是一个异步创建资源的请求，接口在响应202 (“Accepted”)的同时可以给予客户端一个异步状态查询的地址
- **Cache-Control, Expires, Date** 通过缓存机制提升接口响应性能,同时根据实际需要也可以禁止客户端对接口请求做缓存。对于REST接口来说，如果某些接口实时性要求不高的情况下，我们可以使用max-age来指定一个小的缓存时间，这样对客户端和服务器端双方都是有利的。一般来说只对GET方法且返回200的情况下使用缓存，在某些情况下我们也可以对返回3xx或者4xx的情况下做缓存，可以防范错误访问带来的负载。
- 我们可以**自定义一些头信息**，作为客户端和服务器间的通信使用，但不能改变HTTP方法的性质。自定义头尽量简单明了，不要用body中的信息对其作补充说明。

## 数据媒体格式的设计
#### body的媒体格式
- json是一种流行且轻便友好的格式，json是一种无序的键值对的集合，其中key是需要用双引号引起来的，value如果是数字可以不用双引号，如果是非数字的格式需要使用双引号。
- json是允许大小写混用命名的，但要避免使用特殊符号
- 除了json我们也可以使用其他常用的格式，例如xml,html等
- body本身只应包含资源相关的信息，不要附加其它传输状态的信息

#### 错误响应描述
错误类型需要保持统一，错误信息的格式应该保持一致，例如用以下方式(json格式)：
> {
  "id" : Text,  //错误唯一标示id
  "description" : Text  //错误具体描述
}

> 如果有多个错误，可以用json数组来描述：
{
  "elements" : [
    {
      "id" : "Update Failed",
      "description" : "Failed to update /users/1234"
    }
  ]
}

## 客户端相关问题

#### 接口版本管理
- 一个资源，只用一种单一的URI来标示，资源的版本不应该体现在URI中。
- 资源的版本是可以由客户端来指定的，并且提供向后兼容。
- ETag可以用来管理资源的版本，有助于客户端缓存的应用。

#### 接口的安全
- 使用OAuth认证，对敏感资源保护。
- 使用API管理策略，或管理平台（Apigee, Mashery）。

#### 接口数据响应的结构
- 客户端可以指定接口返回需要的资源字段，或者指定不希望返回的字段，这样有助于提升接口交互的效率，较少带宽的浪费。
> 只获许部分字段：
GET /students/morgan?fields=(firstName, birthDate)

> 不希望获取某些字段：
GET /students/morgan?fields=!(address,schedule!(wednesday, friday))  

- 资源数据中可以包含嵌入式链接，用来描述查询资源的子集，我们也可以传入相关参数，要求服务端替换链接为实际的数据。
