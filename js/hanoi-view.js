(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $rootEl) {
    this.$game = game;
    this.$el = $rootEl;
  };

  View.prototype.render = function () {
    var game = this.$game;
    var that = this;
    var totalDisks = 0;
    for (var i = 0; i < game.towers.length; i++) {
      totalDisks += game.towers[i].length;
    }
    var towerWidth = totalDisks * 50;

    var $base = $("<div class=\"base\"></div>");
    for(i = 0; i < 3; i++) {
      var $tower = $("<div class=\"tower\"></div>");
      $tower.attr("id", i+1);

      var numDisks = game.towers[i].length;
      for(var j = numDisks - 1; j >= 0 ; j--) {
        var $disk = $("<div class=\"disk\"></div>");
        var diskSize = game.towers[i][j] * 50;
        $disk.css('width', diskSize);
        $disk.css('top', -(numDisks * 20));

        // if(that.indexes[0] === i) {
        //   $disk.addClass("selected");
        // }
        $tower.append($disk);
      }

      $tower.css("width", towerWidth);
      $base.append($tower);
    }

    this.$el.html($base);
  };

  View.prototype.clickTower = function () {
    var that = this;
    indexes = [];
    this.$el.on("click", ".tower", function(event){
      var $currentTarget = $(event.currentTarget);
      console.log($currentTarget[0].id);
      if (indexes.length < 1) {
        indexes.push(parseInt($currentTarget[0].id));
        // $("#"+indexes[0]).children().first().addClass("selected");
      } else {
        indexes.push(parseInt($currentTarget[0].id));
        that.$game.move(indexes[0] - 1, indexes[1] - 1);
        indexes = [];
      }
      that.render();
      console.log(that.$game.towers);

      if (that.$game.isWon()) {
        alert("You've won!");
        that.$game = new Hanoi.Game();
        that.render();
      }
    });
  };
})();
