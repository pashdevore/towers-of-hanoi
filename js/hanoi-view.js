(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $rootEl) {
    this.$game = game;
    this.$el = $rootEl;
    this.indexes = [];
  };

  View.prototype.render = function () {
    var game = this.$game;
    var that = this;
    var totalDisks = 0;
    var i, j = 0;



    // looks through all towers and sums up total disks
    for (i = 0; i < game.towers.length; i++) {
      totalDisks += game.towers[i].length;
    }
    // towers' width based on total number of disks
    var towerWidth = totalDisks * 50;

    var $base = $("<div class=\"base\"></div>");
    for(i = 0; i < 3; i++) {

      // create 3 towers in HTML, each with id attribute
      var $tower = $("<div class=\"tower\"></div>");
      $tower.attr("id", i+1);

      // get current number of disks of tower
      var numDisks = game.towers[i].length;
      for(j = numDisks - 1; j >= 0 ; j--) {
        var $disk = $("<div class=\"disk\"></div>");

        // determine size of disk
        var diskSize = game.towers[i][j] * 50;
        $disk.css('width', diskSize);
        $disk.css('top', -(numDisks * 20));

        // top disk index
        var idx = numDisks - 1;
        var fromTower = this.indexes[0];
        // top disk HTML div
        var $topDisk = $("#" + fromTower).children().first();

        // make sure selected disk stays selected
        if($topDisk.hasClass('selected') && j === idx && i === fromTower-1) {
          $disk.addClass("selected");
        }
        $tower.append($disk);
      }

      $tower.css("width", towerWidth);
      $base.append($tower);
    }

    this.$el.html($base);
    this.$el.prepend("<h1 class='header'>Towers of Hanoi</h1>");
    $(".header").css("width", towerWidth * 3);
    $(".header").css("text-align", "center");
  };

  View.prototype.clickTower = function () {
    var that = this;
    this.$el.on("click", ".tower", function(event){
      var $currentTarget = $(event.currentTarget);
      console.log($currentTarget[0].id);
      if (that.indexes.length < 1) {
        that.indexes.push(parseInt($currentTarget[0].id));
        $("#"+that.indexes[0]).children().first().addClass("selected");
      } else {
        that.indexes.push(parseInt($currentTarget[0].id));
        that.$game.move(that.indexes[0] - 1, that.indexes[1] - 1);
        that.indexes = [];
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
