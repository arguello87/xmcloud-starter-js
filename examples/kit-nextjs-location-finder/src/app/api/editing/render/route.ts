import { createEditingRenderRouteHandlers } from '@sitecore-content-sdk/nextjs/route-handler';

/**
 * This API route is used by Sitecore Editor in XM Cloud
 * to render components for editing mode.
 */

const baseHandler = createEditingRenderRouteHandlers({});

export async function GET(request: Request) {
  const response = await baseHandler.GET(request as never);
  // #region agent log
  fetch('http://127.0.0.1:7775/ingest/6997f38c-3bc8-4baa-a257-f4d39dd3bdb3',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89a230'},body:JSON.stringify({sessionId:'89a230',runId:'pre-fix',hypothesisId:'A,C',location:'location-finder/editing/render/GET',message:'editing render GET',data:{origin:request.headers.get('origin'),status:response.status,xfo:response.headers.get('x-frame-options'),csp:response.headers.get('content-security-policy')},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  return response;
}

export const POST = baseHandler.POST;
export const OPTIONS = baseHandler.OPTIONS;
