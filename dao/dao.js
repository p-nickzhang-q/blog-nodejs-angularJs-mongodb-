/*
 * @Author: Administrator
 * @Date:   2018-01-02 14:44:07
 * @Last Modified by:   p-nickzhang-q
 * @Last Modified time: 2018-04-23 15:22:38
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DB_CONN_STR = 'mongodb://localhost:27017/blog';
/*------------------------------------------------------------------*/

const UserSchema = new Schema({
    username: String,
    password: Number
});
var UserModel = mongoose.model('user', UserSchema);

const CommentSchema = new Schema({
    commentText: String,
    date: Date
});

const BlogSchema = new Schema({
    introText: String,
    blogText: String,
    languageId: Number,
    date: Date,
    comments: [CommentSchema],
    img: String
});

var BlogModel = mongoose.model('blog', BlogSchema);

/*------------------------------------------------------------------*/
var login = function(username, callback) {
    UserModel.findOne({ 'username': username }, function(err, doc) {
        if (err) {
            console.error(err);
        } else {
            callback(err, doc);
        }
    });
};

var saveBlog = function(blog, callback) {
    new BlogModel(blog).save(function(err, doc) {
        if (err) {
            console.error(err);
        } else {
            callback(err, doc);
        }
    });
};

var getBlogs = function(pageNumber, pageSize, callback) {
    BlogModel.find(function(err, docs) {
        if (err) {
            console.error(err);
        } else {
            BlogModel.find().count(function(err, total) {
                if (err) console.error(err);
                callback(err, docs, total);
            });
        }
    }).limit(pageSize).skip(pageNumber * pageSize);
};

var getBlogById = function(id, callback) {
    BlogModel.findById(id, function(err, doc) {
        if (err) {
            console.error(err);
        } else {
            callback(err, doc);
        }
    });
};

var updateBlog = function(id, blog, callback) {
    BlogModel.findOneAndUpdate({ '_id': id }, blog, function(err, raw) {
        if (err) {
            console.error(err);
        } else {
            callback(err, raw);
        }
    });
};

var deleteBlog = function(id, callback) {
    BlogModel.deleteOne({ '_id': id }, function(err) {
        if (err) {
            console.error(err);
        } else {
            callback(err);
        }
    });
}

var deleteComment = function(blogid, commentId, callback) {
    var content = { $pull: { comments: { _id: commentId } } };
    updateBlog(blogid, content, callback);
};

var addComment = function(blogid, comment, callback) {
    var content = { $push: { comments: comment } };
    updateBlog(blogid, content, callback);
};

/*------------------------------------------------------------------*/
module.exports = {
    login: function(username, callback) {
        mongoose.connect(DB_CONN_STR, function(err) {
            if (err) {
                console.error(err)
            } else {
                login(username, callback);
            }
        })
    },
    saveBlog: function(blog, callback) {
        mongoose.connect(DB_CONN_STR, function(err) {
            if (err) {
                console.error(err)
            } else {
                saveBlog(blog, callback);
            }
        })
    },
    getBlogs: function(pageNumber, pageSize, callback) {
        mongoose.connect(DB_CONN_STR, function(err) {
            if (err) {
                console.error(err)
            } else {
                getBlogs(pageNumber, pageSize, callback);
            }
        })
    },
    getBlogById: function(id, callback) {
        mongoose.connect(DB_CONN_STR, function(err) {
            if (err) {
                console.error(err)
            } else {
                getBlogById(id, callback);
            }
        })
    },
    updateBlog: function(id, blog, callback) {
        mongoose.connect(DB_CONN_STR, function(err) {
            if (err) {
                console.error(err)
            } else {
                updateBlog(id, blog, callback);
            }
        })
    },
    deleteBlog: function(id, callback) {
        mongoose.connect(DB_CONN_STR, function(err) {
            if (err) {
                console.error(err)
            } else {
                deleteBlog(id, callback);
            }
        })
    },
    deleteComment: function(blogid, commentId, callback) {
        mongoose.connect(DB_CONN_STR, function(err) {
            if (err) {
                console.error(err)
            } else {
                deleteComment(blogid, commentId, callback);
            }
        })
    },
    addComment: function(blogid, comment, callback) {
        mongoose.connect(DB_CONN_STR, function(err) {
            if (err) {
                console.error(err)
            } else {
                addComment(blogid, comment, callback);
            }
        })
    }
};