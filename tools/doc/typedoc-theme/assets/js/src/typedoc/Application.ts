namespace typedoc
{
    /**
     * Service definition.
     */
    export interface IService
    {
        constructor:any;
        name:string;
        instance:any;
        priority:number;
    }


    /**
     * Component definition.
     */
    export interface IComponent
    {
        constructor:any;
        selector:string;
        priority:number;
        namespace:string;
    }


    /**
     * List of all known services.
     */
    var services:IService[] = [];

    /**
     * List of all known components.
     */
    var components:IComponent[] = [];

    /**
     * Register a new component.
     */
    export function registerService(constructor:any, name:string, priority:number = 0) {
        services.push({
            constructor: constructor,
            name:        name,
            priority:    priority,
            instance:    null
        });

        services.sort((a:IService, b:IService) => a.priority - b.priority);
    }


    /**
     * Register a new component.
     */
    export function registerComponent(constructor:any, selector:string, priority:number = 0, namespace:string = '*')
    {
        components.push({
            selector:    selector,
            constructor: constructor,
            priority:    priority,
            namespace:   namespace
        });

        components.sort((a:IComponent, b:IComponent) => a.priority - b.priority);
    }


    /**
     * TypeDoc application class.
     */
    export class Application
    {
        /**
         * Create a new Application instance.
         */
        constructor() {
            this.createServices();
            this.createComponents(document.body);
        }


        /**
         * Create all services.
         */
        private createServices() {
            services.forEach((c) => {
                c.instance = new c.constructor();
                (typedoc as any)[c.name] = c.instance;
            });
        }


        /**
         * Create all components beneath the given jQuery element.
         */
        public createComponents(context:HTMLElement, namespace:string = 'default') {
            components.forEach((c) => {
                if (c.namespace != namespace && c.namespace != '*') {
                    return;
                }

                context.querySelectorAll<HTMLElement>(c.selector).forEach((el) => {
                    if (!el.dataset.hasInstance) {
                        new c.constructor({el:el});
                        el.dataset.hasInstance = String(true);
                    }
                });
            });
        }
    }
}
