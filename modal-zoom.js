/* ========================================================================
 * rc :  Modal 
 * ======================================================================== */

!(function ($) {
  'use strict';

      // Modal CLASS DEFINITION
      //  element : modal , options : Event Handler data() + more 
      // ======================

      var Modal = function (element, options) {
            this.options          = options
            this.$body            = $(document.body)
            this.$element       = $(element)
            this.title               = this.options.title?this.options.title:null
            this.url               = this.options.url?this.options.url:null
            this.isShown             = null
     }

      Modal.VERSION  = '1.1.0'
      Modal.DEFAULTS = {
            show: true,
            afterModal : true,
            history : true
      }

      Modal.prototype.toggle = function (_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget)
      }
 
      Modal.prototype.show = function (_relatedTarget) {
            var $this = this
            var e    = $.Event('show.rc.modal', { relatedTarget: _relatedTarget })
            var title =this.title;
            var modal=this.options.target?this.options.target:'#'+this.$element.attr('id'); // 엘리먼트 클릭(target) & script 오픈 2 가지 
            var url =this.url;
            if(url!=null) url=url.toString();
            var animation=this.options.animation?this.options.animation:'';
            var template=this.options.template;
            var tplContainer=this.options.tplcontainer?modal+' '+this.options.tplcontainer:modal;
            this.$element.trigger(e);
            this.isShown = true

           // init Utility
            var utility=new Utility(modal,this.options).init();  
            if(!template){
                 utility.setdataVal(modal,$this.options); // data 값 세팅하는 전용함수 사용한다.
            }else{ 
               $(tplContainer).load(template,$.proxy(function(){
                    utility.setdataVal(modal,$this.options); // data 값 세팅하는 전용함수 사용한다. 
                    this.afterTemplate(this,_relatedTarget);
               },this));   
            }

            this.$element.on('tap.dismiss.rc.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this)) 
             
            this.$element.addClass(animation); // 에니메이션 적용
            $(modal).show();
            setTimeout(function(){
                if($this.options.self){
                   var content=$(modal).find('.modal__content'); 
                   $(modal).addClass('modal--active');
                   $(content).addClass('modal__content--active');  

                   window.addEventListener('transitionend', $this.hideTmpDiv, false);
                } 
                else $(modal).addClass('active')
            }, 0);
            if(this.options.history){
                // 브라우저 history 객체에 추가 
                var object = {'type': 'modal','target': {'id':modal,'self':this.options.self}}
                utility.addHistoryObject(object,title,url);  
            }
          
           this.afterModal(this,_relatedTarget);              
      }

      Modal.prototype.afterTemplate=function(obj,_relatedTarget){
            var e = $.Event('loaded.rc.modal', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e);  
      }

      Modal.prototype.afterModal=function(obj,_relatedTarget){
            var e = $.Event('shown.rc.modal', { relatedTarget: _relatedTarget })
            obj.$element.trigger('focus').trigger(e);
      }

      Modal.prototype.hide = function (event) {
           if(this.options.history) history.back();
           else this.nonHistoryHide(event);
      }
     
     Modal.prototype.historyHide = function () {
            this.isShown = false
            if (event) event.preventDefault()
            var e    = $.Event('hide.rc.modal');
            this.$element.trigger(e) 
            this.afterHide();
      }

      Modal.prototype.nonHistoryHide = function (event) {
            this.isShown = false
            if (event) event.preventDefault();
            var modal=this.$element;
            var e    = $.Event('hide.rc.modal');
            $(modal).trigger(e)
            if(this.options.self) this.hideSelfModal();
            else {
                $(modal).removeClass('active');
                setTimeout(function(){$(modal).hide();},300); 
                this.afterHide();
            }                
      }

      Modal.prototype.afterHide=function(){
           var e = $.Event('hidden.rc.modal');
           this.$element.trigger(e);     
      }

      Modal.prototype.makeTmpDiv=function(trig,modal){
            this.$tmpDiv = $(document.createElement('div'))
                  .addClass('modal__temp')
                  .appendTo(trig)
            this.moveTrig(trig, modal, this.$tmpDiv);
      }

      Modal.prototype.moveTrig=function(trig,modal,tmpDiv){
          var $this=this;
          var trigProps = trig.getBoundingClientRect();
          var m = modal;
          var mProps = m.querySelector('.modal__content').getBoundingClientRect();
          var transX, transY, scaleX, scaleY;
          var xc = window.innerWidth / 2;
          var yc = window.innerHeight / 2;
          var view=$(document).find('.content');
          var bar =$(document).find('.bar-nav');
          var bar_h =bar.innerHeight();
          var view_h=view.innerHeight();
          var view_w=view.innerWidth();

          // set modal size
          $(modal).find('.modal__content').css({'width':view_w,'height':view_h,'top':bar_h}); 

          // this class increases z-index value so the button goes overtop the other buttons
          $(trig).addClass('modal__trigger--active');

          // these values are used for scale the temporary div to the same size as the modal
          scaleX = view_w;//mProps.width / trigProps.width;
          scaleY = view_h;//mProps.height / trigProps.height;

          //scaleX = scaleX.toFixed(3); // round to 3 decimal places
          //scaleY = scaleY.toFixed(3);


          // these values are used to move the button to the center of the window
          transX = Math.round(xc - trigProps.left - trigProps.width / 2);
          transY = Math.round(yc - trigProps.top - trigProps.height / 2);

          // if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
          if (m.classList.contains('modal--align-top')) {
            transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
          }
          // translate button to center of screen
          //trig.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
          //trig.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';
          $(trig).css({
             'transform': 'translateY(-100px)',
             'z-index' : 10000
          });

          // expand temporary div to the same size as the modal
          $(tmpDiv).css('transform','scale(' + scaleX + ',' + scaleY + ')');
          $(tmpDiv).css('webkitTransform','scale(' + scaleX + ',' + scaleY + ')');
  
          window.requestAnimationFrame(function() {
             $this.show();
          });
     
      }

      Modal.prototype.hideTmpDiv=function(){
           $('.modal__temp').css('opacity','0');
           window.removeEventListener('transitionend', this.hideTmpDiv, false);
      }

      Modal.prototype.hideSelfModal=function(){
          var tmpDiv=$(document).find('.modal__temp');
          var modal=this.$element;
          var content=$(modal).find('.modal__content');
          var trig=$(document).find('.modal__trigger');
          // temp div 
          $(tmpDiv).css("opacity",1);
          $(tmpDiv).removeAttr("style");

          // modal 
          $(modal).removeClass('modal--active');
          $(content).removeClass('modal__content--active');
          $(trig).css('transform','none');
          $(trig).css('webkitTransform','none');
          window.addEventListener('transitionend',this.removeTmpDiv(tmpDiv),false);
          this.isShown = false
          if (event) event.preventDefault()
          var e    = $.Event('hide.rc.modal');
          this.$element.trigger(e) 
          this.afterHide();
      }

      Modal.prototype.removeTmpDiv=function(tmpDiv){
          setTimeout(function() {
               window.requestAnimationFrame(function() {
                  // remove the temp div from the dom with a slight delay so the animation looks good
                  $(tmpDiv).remove();
              });
          }, 350);
      }  
     


      var old = $.fn.modal

      $.fn.modal             = Plugin
      $.fn.modal.Constructor = Modal


        // MODAL NO CONFLICT
        // =================

      $.fn.modal.noConflict = function () {
            $.fn.modal = old
            return this
      }

      // MODAL PLUGIN DEFINITION
      // =======================

      function Plugin(option, _relatedTarget) {
            return this.each(function () {
                var $this   = $(this)
                var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

                var data = new Modal(this, options)
                if(data.options.self){
                   var len = data.options.target.length;
                   var modalIdTrimmed = data.options.target.substring(1, len);
                   var modalDiv=document.getElementById(modalIdTrimmed); 
                   //data.ripple(_relatedTarget,modalDiv);
                   setTimeout(function(){
                      data.makeTmpDiv(_relatedTarget,modalDiv); 
                   },300)
                   
                }else{
                    if (typeof option == 'string' && option!='toggle') data[option](_relatedTarget)
                    else if (options.show) data.show(_relatedTarget)    
                } 
                
           })
       }
      
      // MODAL DATA-API
      // ==============
       
      $(document).on('tap.rc.modal.data-api', '[data-toggle="modal"]', function (e) {
          var $this   = $(this)
          var href    = $this.attr('href')
          var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
          var option  = $target.data('rc.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
         
          if ($this.is('a')) e.preventDefault()

           $target.one('show.rc.modal', function (showEvent) {
                  if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
                  $target.one('hidden.rc.modal', function () {
                   $this.is(':active') && $this.trigger('focus')
                })
            }) 
           Plugin.call($target, option, this,e)
      })

}(jQuery));