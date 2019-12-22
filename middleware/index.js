// All the middleware comes here
var db = require('../model')
var middlewareObj={};

middlewareObj.isloggedin=function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','You need to be logged in to do that');
    res.redirect('/users/login')
}

middlewareObj.checkisAdmin=function(req,res,next){
    if(req.isAuthenticated()){
        db.User.findById(req.params.id, (err,admin) => {
        	if(admin.type !== 'User'){
         		next();   
			}else{
				req.flash('error','You dont Have The permission')
                res.redirect('/clothes')
        	}
        })
    }
}


//middlewareObj.checkOwner=function(req,res,next){
//    if(req.isAuthenticated()){
//        Comment.findById(req.params.comment_id, function(err,foundcomment){
//        if(err){
//            req.flash('error','An Error Occurred')
//            res.redirect('back')
//        }else{
//            if(foundcomment.author.id.equals(req.user._id)){
//               next();   
//            }else{
//                req.flash('error','You Dont Have The Permission To Do That')
//                res.redirect('back')
//            }
//        }
//    })     
//    }else{
//        req.flash('error','You need To Be Logged In')
//        res.redirect('back')
//    }
//}
//
//
//middlewareObj.checkAdmin=function(req,res,next){
//    if(req.isAuthenticated()){
//        if(req.user.username === 'oluleyepeters'){
//            next()
//        }else{
//            req.flash('error','Permission not granted')
//            res.redirect('back')
//        }
//    }else{
//        req.flash('error','You need to be logged in')
//        res.redirect('back')
//    }
//}

module.exports=middlewareObj