
function jstree_fun(url){
	var $tree = $("#jstree_demo_div").jstree({
		"core":{
			//'multiple': false,  // 是否可以选择多个节点
			//"check_callback": true, //    允许拖动菜单  唯一 右键菜单
			"check_callback" : true,//设置为true,当用户修改数时,允许所有的交互和更好的控制(例如增删改)
			"themes" : { "stripes" : true },//主题配置对象,表示树背景是否有条带
			"data" : {
				//'url' : url,
				//'data' : function(node){
					//return { 'id' : node.id };
				//}
				"url" : url,
				"dataType" : "json"
			},
			"check_callback" : function(operation, node, node_parent, node_position, more){
				if(operation === "move_node"){
					var node = this.get_node(node_parent);
					if(node.id === "#"){
						alert("根结点不可以删除");
						return false;
					}
					if(node.state.disabled){
						alert("禁用的不可以删除");
						return false;
					}
				}else if(operation === "delete_node"){
					var node = this.get_node(node_parent);
					if(node.id === "#"){
						alert("根结点不可以删除");
						return false;
					}
				}
				return true;
			}
		},
		"plugins": [ //插件  
                    "search", //允许插件搜索  
                   // "sort", //排序插件  
                    "state", //状态插件  
                    "types", //类型插件  
                    "unique", //唯一插件  
                    "wholerow", //整行插件
					"contextmenu"
                    ],
		types:{  
            "default": { //设置默认的icon 图  
				"icon": "glyphicon glyphicon-folder-close",  
			}  
        }
	});
	$tree.on("open_node.jstree", function(e,data){ //监听打开事件
		var currentNode = data.node;  
		data.instance.set_icon(currentNode, "glyphicon glyphicon-folder-open"); 
	});
	$tree.on("close_node.jstree", function(e,data){ //监听关闭事件 
		var currentNode = data.node;  
		data.instance.set_icon(currentNode, "glyphicon glyphicon-folder-close"); 
	});
	
	$tree.on("activate_node.jstree", function(e, data){
		var currentNode = data.node; //获取当前节点的json .node  
        //alert(currentNode.a_attr.id)   
        //alert(currentNode.a_attr.href) //获取超链接的  .a_attr.href "链接"  .a_attr.id ID  
        //alert(currentNode.li_attr.href) //获取属性的  .li_attr.href "链接"  .li_attr.id ID  
	});
	
	// 创建
	$tree.on("create_node.jstree", function(e, data){
		alert("创建node节点");
	});
	
	// 修改
	$tree.on("rename_node.jstree", function(e, data){
		alert("修改node节点");
	});
	
	// 删除
	$tree.on("delete_node.jstree", function(e, data){
		alert("删除node节点");
	});
	
	// 查询节点名称
	var to = false;
	$("#search_ay").keyup(function(){
		if(to){
			clearTimeout(to);
		}
		to = setTimeout(function(){
			$tree.jstree(true).search($('#search_ay').val()); //开启插件查询后 使用这个方法可模糊查询节点  
		},250);
	});
	
	$('.btn-tab').click(function(){ //选项事件   
        //alert($(this).attr("var"))  
        $tree.jstree(true).destroy();   //可做联级  
        $tree = jstree_fun($(this).attr("var"));//可做联级  
        //alert($(this).attr("var"))              
    });  
                  
    $('.refresh').click(function(){ //刷新事件  
        $tree.jstree(true).refresh ()  
    });  
	return $tree; 
}

function node_create(){
	var ref = $("#jstree_demo_div").jstree(true);
	var sel = ref.get_selected();
	if(!sel.length){
		alert("请先选择一个节点");
		return;
	}
	sel = sel[0];
	sel = ref.create_node(sel);
	if(sel){
		ref.edit(sel);	
	}
}

function node_rename(){
	var ref = $("#jstree_demo_div").jstree(true);
	var sel = ref.get_selected();
	if(!sel.length){
		alert("请先选择一个节点");
		return;
	}
	sel = sel[0];
	ref.edit(sel);
}

function node_delete(){
	var ref = $("#jstree_demo_div").jstree(true);
	var sel = ref.get_selected();
	if(!sel.length){
		alert("请先选择一个节点");
		return;
	}
	sel = sel[0];
	if(ref.get_node(sel).parent=='#'){
		alert("根节点不允许删除");
		return;
	}
	ref.delete_node(sel);
}

// 初始化操作
function init(){
	var $tree = jstree_fun("json/data.json");
}

init();





















