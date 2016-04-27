/**
 * ag-grid - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v4.1.3
 * @link http://www.ag-grid.com/
 * @license MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var rowRenderer_1 = require("./rowRenderer");
var gridPanel_1 = require("../gridPanel/gridPanel");
var context_1 = require("../context/context");
var context_2 = require("../context/context");
var headerRenderer_1 = require('../headerRendering/headerRenderer');
var AutoWidthCalculator = (function () {
    function AutoWidthCalculator() {
    }
    // this is the trick: we create a dummy container and clone all the cells
    // into the dummy, then check the dummy's width. then destroy the dummy
    // as we don't need it any more.
    // drawback: only the cells visible on the screen are considered
    AutoWidthCalculator.prototype.getPreferredWidthForColumn = function (column) {
        // we put the dummy into the body container, so it will inherit all the
        // css styles that the real cells are inheriting
        var eBodyContainer = this.gridPanel.getBodyContainer();
        // get all the cells that are currently displayed (this only brings back
        // rendered cells, rows not rendered due to row visualisation will not be here)
        var eOriginalCells = this.rowRenderer.getAllCellsForColumn(column);
        // calculate the width for the column with the most text
        var eColumnWidth = this.getPreferredWidth(eBodyContainer, eOriginalCells);
        // we put the dummy into the header container, so it will inherit all the
        // css styles that the real cells are inheriting
        var eHeaderContainer = this.gridPanel.getHeaderContainer();
        // get the header cell for the column
        // we need to wrap it in an array so that it works with the the same function as the body cells
        var eOriginalHeaderCells = [this.headerRenderer.getHeaderCellForColumn(column)];
        // calculate the width for the header column
        // we add extra space so that the sorting icon has room
        var eHeaderWidth = this.getPreferredWidth(eHeaderContainer, eOriginalHeaderCells) + 10;
        // if grid is using enterprise, we need to add extra space for the menu icon
        if (this.enterprise) {
            eHeaderWidth += 20;
        }
        // if the header width is larger than the column width, than it the column width will be over written
        if (eColumnWidth < eHeaderWidth) {
            eColumnWidth = eHeaderWidth;
        }
        // we add 4 as I found without it, the gui still put '...' after some of the texts
        return eColumnWidth + 4;
    };
    AutoWidthCalculator.prototype.getPreferredWidth = function (eContainer, eOriginalCells) {
        var _this = this;
        var eDummyContainer = document.createElement('span');
        // position fixed, so it isn't restricted to the boundaries of the parent
        eDummyContainer.style.position = 'fixed';
        eContainer.appendChild(eDummyContainer);
        // padding offset to make the column bigger if there is padding styling applied
        var paddingOffset = 0;
        eOriginalCells.forEach(function (eCell, index) {
            if (eCell) {
                eDummyContainer.appendChild(_this.getCloneParent(eCell));
                // gets the global style of the element
                var computedStyle = window.getComputedStyle(eCell, null);
                // calculates the horizontal cell padding
                var cellPadding = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
                // checks if the cell padding is more than the current padding offset
                if (paddingOffset < cellPadding) {
                    paddingOffset = cellPadding;
                }
            }
        });
        // at this point, all the clones are lined up vertically with natural widths. the dummy
        // container will have a width wide enough just to fit the largest.
        var dummyContainerWidth = eDummyContainer.offsetWidth;
        // we are finished with the dummy container, so get rid of it
        eContainer.removeChild(eDummyContainer);
        // Adding the padding offset to the content width
        return dummyContainerWidth + paddingOffset;
    };
    AutoWidthCalculator.prototype.getCloneParent = function (eCell) {
        // make a deep clone of the cell
        var eCellClone = eCell.cloneNode(true);
        // the original has a fixed width, we remove this to allow the natural width based on content
        eCellClone.style.width = '';
        // the original has position = absolute, we need to remove this so it's positioned normally
        eCellClone.style.position = 'static';
        eCellClone.style.left = '';
        // we put the cell into a containing div, as otherwise the cells would just line up
        // on the same line, standard flow layout, by putting them into divs, they are laid
        // out one per line
        var eCloneParent = document.createElement('div');
        // table-row, so that each cell is on a row. i also tried display='block', but this
        // didn't work in IE
        eCloneParent.style.display = 'table-row';
        // the twig on the branch, the branch on the tree, the tree in the hole,
        // the hole in the bog, the bog in the clone, the clone in the parent,
        // the parent in the dummy, and the dummy down in the vall-e-ooo, OOOOOOOOO! Oh row the rattling bog....
        eCloneParent.appendChild(eCellClone);
        return eCloneParent;
    };
    __decorate([
        context_2.Autowired('rowRenderer'), 
        __metadata('design:type', rowRenderer_1.RowRenderer)
    ], AutoWidthCalculator.prototype, "rowRenderer", void 0);
    __decorate([
        context_2.Autowired('gridPanel'), 
        __metadata('design:type', gridPanel_1.GridPanel)
    ], AutoWidthCalculator.prototype, "gridPanel", void 0);
    __decorate([
        context_2.Autowired('headerRenderer'), 
        __metadata('design:type', headerRenderer_1.HeaderRenderer)
    ], AutoWidthCalculator.prototype, "headerRenderer", void 0);
    __decorate([
        context_2.Autowired('enterprise'), 
        __metadata('design:type', Boolean)
    ], AutoWidthCalculator.prototype, "enterprise", void 0);
    AutoWidthCalculator = __decorate([
        context_1.Bean('autoWidthCalculator'), 
        __metadata('design:paramtypes', [])
    ], AutoWidthCalculator);
    return AutoWidthCalculator;
})();
exports.AutoWidthCalculator = AutoWidthCalculator;
