
function getProfile(username) {
    instagramFeed({
        'username': username,
        'container': "#insta-feed",
        'host': 'https://images' + ~~(Math.random() * 3333) + '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/',
        'display_profile': true,
        'display_biography': true,
        'display_gallery': true,
        'display_captions': true,
        'max_tries': 10,
        'callback': null,
        'styling': true,
        'items': 30,
        'items_per_row': 3,
        'margin': 1,
        'lazy_load': true,
    });
};

function getTag(tag) {
    instagramFeed({
        'tag': tag,
        'container': "#insta-feed",
        'host': 'https://images' + ~~(Math.random() * 3333) + '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/',
        'display_profile': true,
        'display_gallery': true,
        'display_captions': true,
        'max_tries': 8,
        'callback': null,
        'styling': true,
        'items': 50,
        'margin': 1,
        'lazy_load': true,
    });
};
function getLoc(loc) {
    instagramFeed({
        'location': loc,
        'container': "#insta-feed",
        'host': 'https://images' + ~~(Math.random() * 3333) + '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/',
        'display_profile': true,
        'display_gallery': true,
        'display_captions': true,
        'max_tries': 8,
        'callback': null,
        'styling': true,
        'items': 22,
        'margin': 1,
        'lazy_load': true,
    });
};

function searchRequest(query) {
    $.get('https://www.instagram.com/web/search/topsearch/?context=blended&query=' + query + '&rank_token=0.9094692182667705&include_reel=true', (data) => {


        $('#search_options').empty();

        if (data.users) {
            $('#search_options').append('<div id="showprofile" class="row mx-2 mt-3 justify-content-center">');
            data.users.forEach(element => {
                $('#showprofile').append(
                    '<div class="col-8 col-sm-8 col-md-3 col-lg-3 col-xl-2 gls_morph_no_shadow mb-3 mx-2">' +
                    '<a href="/profile/' + element.user.username + '" style="text-decoration: none;">' +
                    '<img src="' + element.user.profile_pic_url + '"class="img-fluid p-2" style="border-radius: 50%;"/>' +
                    '<p class="text-center p-2 white_text">@' + element.user.username + '</p>' +
                    '</a></div>'
                );
            });
            $('#search_options').append('</div>')
        }

        if (data.hashtags) {
            $('#search_options').append('<div id="showtags" class="row mx-5 my-3 justify-content-center gls_morph p-3" style="border-radius: 10px; display: none;">');
            data.hashtags.forEach(element => {
                $('#showtags').append(
                    '<a href="/tag/' + element.hashtag.name + '" class="btn gls_morph white_text tags_style white_link mx-4 my-2" style="font-size: 20px; border: 1px solid #333333; padding: 5px 18px; border-radius: 15px;">#' + element.hashtag.name + '</a>'
                );
            });
            $('#search_options').append('</div>');
        }

        if (data.places) {
            $('#search_options').append('<div id="showlocation" class="row mx-5 mt-3 justify-content-center gls_morph p-3" style="border-radius: 10px; display: none;">');
            data.places.forEach(element => {
                $('#showlocation').append(
                    '<a href="/location/' + element.place.location.short_name + '" class="btn gls_morph white_text tags_style white_link mx-4 my-2" style="font-size: 20px; border: 1px solid #333333; padding: 5px 18px; border-radius: 15px;">*' + element.place.location.short_name + '</a>'
                );
            });
            $('#search_options').append('</div>');
        }




        if (!data.users) {
            $('#search_options').append('<div id="showprofile" class="row mx-2 mt-3 justify-content-center" ></div>');
            $('#showprofile').append('<div class="gls_morph error_gls m-4 p-3">' +
                '<h2 class="text-center error_msg"> We had not found tags or location related to <a style="text-decoration: none;" href="/profile/' + query + '">' + query + '</a></h2>' +
                '<h4 class="text-center error_msg_h4"><a style="text-decoration: none;" href="/profile/' + query + '">Click Here</a> to see go to @' + query + '.</h4></div>');
        }

        if (!data.hashtags) {
            $('#search_options').append('<div id="showtags" class="row mx-2 mt-3 justify-content-center" style="display: none;"></div>');
            $('#showtags').append('<div class="gls_morph error_gls m-4 p-3">' +
                '<h2 class="text-center error_msg"> We had not found tags or location related to <a style="text-decoration: none;" href="/profile/' + query + '">' + query + '</a></h2>' +
                '<h4 class="text-center error_msg_h4"><a style="text-decoration: none;" href="/tag/' + query + '">Click Here</a> to see go to #' + query + '.</h4></div>');
        }

        if (!data.places) {
            $('#search_options').append('<div id="showlocation" class="row mx-2 mt-3 justify-content-center" style="display: none;"></div>');
            $('#showlocation').append('<div class="gls_morph error_gls m-4 p-3">' +
                '<h2 class="text-center error_msg"> We had not found tags or location related to <a style="text-decoration: none;" href="/profile/' + query + '">' + query + '</a></h2>' +
                '<h4 class="text-center error_msg_h4"><a style="text-decoration: none;" href="/location/' + query + '">Click Here</a> to see go to *' + query + '.</h4></div>');
        }

    }).error(function (jqXHR, textStatus, errorThrown) {
        $('#showlocation').append('<p class="white_text">Something is wrong while loading data.</p>')
        $('#showprofile').append('<p class="white_text">Something is wrong while loading data.</p>')
        $('#showtags').append('<p class="white_text">Something is wrong while loading data.</p>')
    });
}

function getPostData(shortcode) {
    $.get('https://www.instagram.com/p/' + shortcode + '/?__a=1', (data) => {
        _sm = data.graphql.shortcode_media;
        if (!_sm) {
            $('#Post_data').html('<div class="container "><div class="row gls_morph justify-content-center m-5 p-5"><h2>Data Loading Failed.....</h2></div></div>');
        }
        else {
            if(!_sm.edge_media_to_caption.edges[0]){
                caption = '';
            }else{
                caption = _sm.edge_media_to_caption.edges[0].node.text;
            }
            var html = '<div class="container"><div class="row justify-content-center"><div class="col-9 gls_morph m-3 col-sm-9 col-md-8 col-lg-6 col-xl-6">';
            html += '<div class="d-flex justify-content-center"><img class="p-2" src="'+ _sm.display_url +'" alt="" width="100%"></div>';
            html += '<div class="post_user_name"><h5 class="text-secondary m-2">@'+ _sm.owner.username +'</h5><p>'+ caption +'</p></div></div>'
            html += '<div class="col-9 gls_morph col-sm-9 col-md-8 col-lg-6 col-xl-6 p-3"> <div class="d-flex justify-content-between">'
            html += '<span><i class="fas fa-heart" style="color: red;"></i>&nbsp;&nbsp;'+ _sm.edge_media_preview_like.count +'&nbsp;Likes</span><span>'+ _sm.edge_media_to_parent_comment.count +'&nbsp;Comments  <i class="fas fa-comment-dots" stye="color: #cccccc;"></i></span>'
            html += '</div></div>'
            if(_sm.edge_media_to_parent_comment.count > 0){
                var comments_to = _sm.edge_media_to_parent_comment.edges;
                comments_to.forEach(elem =>{
                    html += '<div class="col-9 bg-white col-sm-9 col-md-8 col-lg-6 col-xl-6 p-2 mt-4 mb-2 mx-3 text-center">Comments</div><div class="col-9 gls_morph col-sm-9 col-md-8 col-lg-6 col-xl-6 pt-4 my-2 mx-3"><h6><b><a class="text-secondary" style="text-decoration: none;" href="/profile/'+ elem.node.owner.username +'">@'+ elem.node.owner.username +'</a></b></h6><p class="p-2">'+ elem.node.text +'</p></div>'
                });
            }else{
                html += '<div class="col-9 bg-white col-sm-9 col-md-8 col-lg-6 col-xl-6 p-2 mt-4 mb-2 mx-3 text-center">0 Comments on this Post</div>';
            }
            html += '</div></div>';
            $('#Post_data').html(html);
        }
    });
}