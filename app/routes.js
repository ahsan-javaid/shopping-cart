module.exports = function(app) {
	var faker = require('faker');
	var Product = require('./model');
	var PRODUCT_COUNT = 10;
	var products = [];
	for(var i=0; i<PRODUCT_COUNT; i++) {
		products.push({
			id: faker.random.uuid(),
			name: faker.commerce.productName(),
			price: faker.commerce.price(),
			image: faker.image.image(),
			description: faker.lorem.sentence()
		});
	}
	app.get("/product",function(req,res){
		res.set('code', '200');
		res.send({code:200,status:"success",response:products});
	})
	app.get("/product/:id",function(req,res){
		var product;
		for(var i=0;i<products.length;i++){
			if(products[i].id===req.params.id) {
				product = products[i];
				break;
			}
		}
		Product.findOne({id:req.params.id},function(err,data){
			if(err){
				res.send({code:500,status:"error",response:{}});
			}else{
				var inCart= data?true:false;
				res.send({code:200,status:"success",response:{product:product?product:data,inCart:inCart }})
			}

		})
	})

	app.get("/cart",function(req,res){
		Product.find({},function(err,data){
			if(err){
				res.send({code:500,status:"error",response:{}});
			}else{
				res.send({code:200,status:"success",response:data});
			}
		})
	})
	app.post("/cart",function(req,res){
		Product.create(req.body,function(err,data){
			if(err){
				res.send({code:500,status:"error",response:{}});
			}else{
				for(var i=0;i<products.length;i++){
					if(products[i].id===req.body.id) {
						products.splice(i,1);
					}
				}
				res.send({code:200,status:"success",message:"Product Added in Cart",response:data});
			}
		})
	})
	app.delete("/cart/:id",function(req,res){
		Product.findOne({id:req.params.id},function(err,pro){
			if(err){
				res.send({code:500,status:"error",response:{}});
			}else{
				Product.remove({id:req.params.id}, function (err, data) {
					if(err){
						res.send({code:500,status:"error",response:{}});

					}else{
						products.push(pro);
						res.send({code:200,status:"success",message:"Product Removed",response:data});
					}
				})
			}
		})
	})

	app.delete("/checkout",function(req,res){
		Product.remove({},function(err,data){
			if(err){
				res.send({code:500,status:"error",response:{}});
			}else{
				res.send({code:200,status:"success",message:"Successfully Purchased",response:data});
			}
		})
	})


	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};