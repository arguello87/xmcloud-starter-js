import { createEditingConfigRouteHandler } from '@sitecore-content-sdk/nextjs/route-handler';
import { NextRequest, NextResponse } from 'next/server';
import components from '.sitecore/component-map';
import metadata from '.sitecore/metadata.json';
import clientComponents from '.sitecore/component-map.client';
/**
 * This API route is used by Sitecore Editor in XM Cloud
 * to provide editing configuration.
 */

const baseHandler = createEditingConfigRouteHandler({
  components,
  clientComponents,
  metadata,
});

/**
 * Wrap GET handler to add CORS headers
 */
export async function GET(request: NextRequest) {
  const response = await baseHandler.GET(request);
  // #region agent log
  fetch('http://127.0.0.1:7775/ingest/6997f38c-3bc8-4baa-a257-f4d39dd3bdb3',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89a230'},body:JSON.stringify({sessionId:'89a230',runId:'pre-fix',hypothesisId:'B,C',location:'location-finder/editing/config/GET',message:'editing config GET',data:{origin:request.headers.get('origin'),hasSecret:request.nextUrl.searchParams.has('secret'),status:response.status,acao:response.headers.get('access-control-allow-origin'),xfo:response.headers.get('x-frame-options'),csp:response.headers.get('content-security-policy')},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  // Add CORS headers to the response
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Clone the response and add CORS headers
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Handle CORS preflight requests for XM Cloud Page Editor
 */
export async function OPTIONS(request: NextRequest) {
  // #region agent log
  fetch('http://127.0.0.1:7775/ingest/6997f38c-3bc8-4baa-a257-f4d39dd3bdb3',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'89a230'},body:JSON.stringify({sessionId:'89a230',runId:'pre-fix',hypothesisId:'B',location:'location-finder/editing/config/OPTIONS',message:'editing config OPTIONS',data:{origin:request.headers.get('origin'),acrh:request.headers.get('access-control-request-headers'),acrm:request.headers.get('access-control-request-method')},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
