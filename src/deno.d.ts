declare module "https://deno.land/std@0.168.0/http/server.ts" {
  interface ServerInit {
    handler: (req: Request) => Response | Promise<Response>;
    port?: number;
    hostname?: string;
  }
  export function serve(
    handler: (req: Request) => Response | Promise<Response>,
    options?: Omit<ServerInit, "handler">
  ): Promise<void>;
  export function serve(init: ServerInit): Promise<void>;
}
