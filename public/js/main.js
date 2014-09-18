window.pulse = {
	me: {},
	newPost: function (data){
		var article = $('<div>')
		.addClass('bg-primary')
		.attr('id',data._id)
		.css({ 'margin-top': '10px' });
		var colOne = $('<div>').addClass('col-xs-1');
		var colTwo = $('<div>').addClass('col-xs-11');
		var image = $('<img>').attr('src', data.user_id.picture);
		var userID = $("<div>").html('<strong>' + 
			data.user_id.name + 
			'</strong><button type="button" class="close" onclick="rmPost(this)"  data-puls-id="' + 
			data._id + 
			'"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
		var content = $('<div>').html(data.body);
		var date = $('<div>').html('<small>' + 
			new Date(data.date).toString() + ' | ' + data.position +
			'</small>');
		colOne.append(image);
		colTwo.append(userID)
		.append(content)
		.append(date);
		article.append(colOne).append(colTwo);
		$('#timeline').append(article.append($('<div class="clearfix"></div>')));
	},
	getTimeline: function (){
		$.get('/api/posts',function (data){
			for(i in data){
				pulse.newPost(data[i]);
			}
		});
	},
	rmPost: function (obj){
		var id = $(obj).data('puls-id');
		$.ajax({
			url: '/api/posts/' + id,
			method: 'DELETE'
		}).done(function (e){
			if (e==1) {
				$('#' + id).remove();
			};
		});
	},
	login: function (me){
		$.post('/sing-in', {id: me.id},
		function (obj_user){
			$('fb:login-button').hide();
			$('#name').html(obj_user.name);
			$('#birthday').html(obj_user.birthday);
			$('#picture').attr('src',obj_user.picture);
			$('#email').html(obj_user.email);
			if(typeof(obj_user)!=="object"){
				$.post('/sing-up', pulse.me, function (data){
					console.log(data);
					pulse.login();
				});
			}else{
				pulse.getTimeline();
				$('#publish')
				.removeClass('hidden')
				.addClass('show')
				.on('submit', function (e){
					e.preventDefault();
					if($('#body').val().length <= 0){
						alert('Tu estado esta vacio');
					}else{
						$.post('/api/posts', $('#publish').serialize(),function (data){
							$.get('/api/posts/' + data._id, function (data){
								pulse.newPost(data);
								$('textarea[name^=body]').val('')
							})	
						});
					}
				});
			}
		});
	}
};