package com.whileylabs;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.List;

import org.apache.http.*;
import org.apache.http.client.utils.*;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.message.BasicHttpEntityEnclosingRequest;
import org.apache.http.protocol.HttpContext;

import jwebkit.http.HttpMethodDispatchHandler;
import wybs.util.StdProject;
import wyc.builder.WhileyBuilder;
import wyc.io.WhileyFileLexer;
import wyc.io.WhileyFileParser;
import wyc.lang.WhileyFile;
import wyc.util.WycBuildTask;
import wycc.lang.Pipeline;

public class WhileyLabsCompiler extends HttpMethodDispatchHandler {
	
	public WhileyLabsCompiler() {
		super(HttpMethodDispatchHandler.ALLOW_POST);
	}
	
	@Override
	public void post(HttpRequest request, HttpResponse response, HttpContext context)
			throws HttpException, IOException {
		HttpEntity entity = (HttpEntity) checkHasEntity(request);	
		List<NameValuePair> params = URLEncodedUtils.parse(entity);
		for(NameValuePair p : params) {
			if(p.getName().equals("code")) {
				compile(p.getValue());
			}
		}
		response.setStatusCode(HttpStatus.SC_OK);		
	}
	
	private HttpEntity checkHasEntity(HttpRequest request) throws HttpException {
		if(request instanceof BasicHttpEntityEnclosingRequest) {
			BasicHttpEntityEnclosingRequest r = (BasicHttpEntityEnclosingRequest) request;
			return r.getEntity();
		} else {
			throw new HttpException("Missing entity");
		}
	}
	
	private void compile(String code) throws IOException {
		StdProject project = new StdProject();
		WhileyBuilder builder = new WhileyBuilder(project,new Pipeline(WycBuildTask.defaultPipeline));
		System.out.println("GOT HERE");
	}
}
