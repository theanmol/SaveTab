var StatusMessage = {
  showMessage: function(msg,showTime){
    this._addMessage(msg,showTime,'message');
  },
  showError:function(errorMsg,showTime){
    this._addMessage(errorMsg,showTime,'error');
  },
  _addMessage: function(msg,showTime,type){
    var self = this;
    var message = '<p class="'+type+'">'+msg+'</p>';
    $('#status').show();
    $('#status').append(message);
    if(showTime > 0){
      setTimeout(function(){
        self._removeMessage();
      },showTime);
    }
  },
  _removeMessage:function(){
    $('#status').children().fadeOut(500,function(){
      $(this).remove();
      $('#status').hide();
    });
  },
  fastMessage: function(msg){
    $('#status').html('');
    this.showMessage(msg,0,'status');
  },
  hideMessages: function(){
//    return;
    var self = this;
    setTimeout(function(){
      self._removeMessage();
    },1000);
  }
};











