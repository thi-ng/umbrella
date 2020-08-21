/// <reference path='../Application.ts' />
/// <reference path='../Component.ts' />
/// <reference path='../services/Viewport.ts' />

namespace typedoc
{
    /**
     * Stored element and position data of a single anchor.
     */
    interface IAnchorInfo
    {
        /**
         * The anchor element.
         */
        anchor: HTMLElement;

        /**
         * The link element in the navigation representing this anchor.
         */
        link: HTMLElement;

        /**
         * The vertical offset of the anchor on the page.
         */
        position: number;
    }


    /**
     * Manages the sticky state of the navigation and moves the highlight
     * to the current navigation item.
     */
    export class MenuHighlight extends Component
    {
        /**
         * List of all discovered anchors.
         */
        private anchors:IAnchorInfo[] = [];

        /**
         * Index of the currently highlighted anchor.
         */
        private index:number = -1;


        /**
         * Create a new MenuHighlight instance.
         *
         * @param options  Backbone view constructor options.
         */
        constructor(options:IComponentOptions) {
            super(options);

            viewport.addEventListener('resize', () => this.onResize());
            viewport.addEventListener<{ scrollTop:number }>('scroll', e => this.onScroll(e));

            this.createAnchors();
        }


        /**
         * Find all anchors on the current page.
         */
        private createAnchors() {
            var base = window.location.href;
            if (base.indexOf('#') != -1) {
                base = base.substr(0, base.indexOf('#'));
            }

            this.el.querySelectorAll('a').forEach(el => {
                var href = el.href;
                if (href.indexOf('#') == -1) return;
                if (href.substr(0, base.length) != base) return;

                var hash = href.substr(href.indexOf('#') + 1);
                var anchor = document.querySelector<HTMLElement>('a.tsd-anchor[name=' + hash + ']');
                var link = el.parentNode;
                if (!anchor || !link) return;

                this.anchors.push({
                    link:    link as HTMLElement,
                    anchor:  anchor,
                    position: 0
                });
            });

            this.onResize();
        }


        /**
         * Triggered after the viewport was resized.
         */
        private onResize() {
            var anchor: IAnchorInfo;
            for (var index = 0, count = this.anchors.length; index < count; index++) {
                anchor = this.anchors[index];
                const rect = anchor.anchor.getBoundingClientRect();
                anchor.position = rect.top + document.body.scrollTop;
            }

            this.anchors.sort((a, b) => {
                return a.position - b.position;
            });

            const event = new CustomEvent('scroll', {
                detail: {
                    scrollTop: viewport.scrollTop,
                }
            });
            this.onScroll(event);
        }


        /**
         * Triggered after the viewport was scrolled.
         *
         * @param event  The custom event with the current vertical scroll position.
         */
        private onScroll(event: CustomEvent<{ scrollTop:number }>) {
            const scrollTop = event.detail.scrollTop + 5;
            const anchors   = this.anchors;
            const count     = anchors.length - 1;
            let index       = this.index;

            while (index > -1 && anchors[index].position > scrollTop) {
                index -= 1;
            }

            while (index < count && anchors[index + 1].position < scrollTop) {
                index += 1;
            }

            if (this.index != index) {
                if (this.index > -1) this.anchors[this.index].link.classList.remove('focus');
                this.index = index;
                if (this.index > -1) this.anchors[this.index].link.classList.add('focus');
            }
        }
    }


    /**
     * Register this component.
     */
    registerComponent(MenuHighlight, '.menu-highlight');
}
