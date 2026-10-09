import { createEditingConfigRouteHandler } from '@sitecore-content-sdk/nextjs/route-handler';
import components from '.sitecore/component-map';
import clientComponents from '.sitecore/component-map.client';
import metadata from '.sitecore/metadata.json';

/**
 * This API route is used by Sitecore Editor in XM Cloud
 * to determine feature compatibility and configuration.
 */

// Force dynamic rendering since this route uses request headers
export const dynamic = 'force-dynamic';

const baseHandler = createEditingConfigRouteHandler({
  components,
  clientComponents,
  metadata,
});

export async function GET(request: Request) {
  const response = await baseHandler.GET(request as never);
  const url = new URL(request.url);
  // #region agent log
  fetch('http://127.0.0.1:7775/ingest/6997f38c-3bc8-4baa-a257-f4d39dd3bdb3',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89a230'},body:JSON.stringify({sessionId:'89a230',runId:'pre-fix',hypothesisId:'C,E',location:'prospera/editing/config/GET',message:'editing config GET',data:{origin:request.headers.get('origin'),hasSecret:url.searchParams.has('secret'),status:response.status,acao:response.headers.get('access-control-allow-origin'),xfo:response.headers.get('x-frame-options')},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  return response;
}

export async function OPTIONS(request: Request) {
  // #region agent log
  fetch('http://127.0.0.1:7775/ingest/6997f38c-3bc8-4baa-a257-f4d39dd3bdb3',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89a230'},body:JSON.stringify({sessionId:'89a230',runId:'pre-fix',hypothesisId:'B,E',location:'prospera/editing/config/OPTIONS',message:'editing config OPTIONS',data:{origin:request.headers.get('origin'),acrh:request.headers.get('access-control-request-headers')},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  return baseHandler.OPTIONS(request as never);
}
