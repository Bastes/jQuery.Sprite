/**
 *
 * jQuery Sprite plugin
 *
 * @author   Michel Belleville <michel.belleville@gmail.com>
 * @version  1.0.0
 * @requires jQuery v1.3.2 or later
 * @license  GPLv3 [http://www.gnu.org/licenses/gpl.html]
 * 
 * @description Executes a sprite animation using a node
 * @param integer frames number of frame
 * @param integer duration (optional) time (in ms) between each frame
 * @param integer direction (optional) true => horizontal, false => vertical
 * @param integer invert (optional) true => bottom -> top or right -> left
 * @param integer loops (optional) number of loops (0 => always loop)
 * @param function complete (optional) callback when done (/!\ on each node)
 * 
 * Use :
 * FIXME
 * 
 */
(function($) {
  jQuery.fn.sprite = function(frames, options) {
    var settings = jQuery.extend({
      duration: 100,
      direction: false,
      invert: false,
      loops: 1,
      complete: null
    }, options);
    var launch = function() {
      var loop = 0;
      var prelaunch = function() {
        var frame = 0;
        var tickit = function() {
          var position = $(this).css('background-position').split(/\s+/);
          var length = settings['direction']? $(this).width() :
                                              $(this).height();
          var offset = length * frame;
          if (settings['invert']) offset = length * (frames - 1) - offset;
          position[settings['direction'] ? 0 : 1] = '-' + offset + 'px';
          $(this).css({ backgroundPosition: position.join(' ') });
          var again = null;
          if ((frame = ((frame + 1) % frames)) != 0) again = tickit;
          else if ((loop += 1) < settings['loops'] || ! settings['loops'])
            again = prelaunch;
          else if (settings['complete']) $(this).each(settings['complete']);
          if (again) {
            $(this).animate({ opacity: 1 }, {
              duration: settings['duration'],
              complete: again });
          }
        };
        $(this).animate({ opacity: 1 }, {
          duration: settings['duration'],
          complete: tickit });
      };
      $(this).each(prelaunch);
    };
    return this.each(launch);
  };
})(jQuery);
