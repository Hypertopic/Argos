<?xml version="1.0" encoding="utf-8"?>
<!-- 
Author: Aurelien Benel, 2011-2012
License: AGPL

TODO: 
- multiple fathers of a topic (with arrowlink)
- quotes in topic names
-->
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="text" encoding="utf-8"/>

<xsl:template match="/map/node">
	{
		"viewpoint_name": "<xsl:value-of select="@TEXT"/>",
		"topics": {
			<xsl:apply-templates select="/map/node/node" />
		}
	}
</xsl:template>

<xsl:template match="/map/node/node">
	"<xsl:value-of select="@ID"/>": {
		"name": "<xsl:value-of select="@TEXT"/>"
	}
  <xsl:apply-templates select="node[not(@LINK)]" />
  <xsl:if test="position()!=last()">,</xsl:if>
</xsl:template>

<xsl:template match="node">
	, "<xsl:value-of select="@ID"/>": {
		"name": "<xsl:value-of select="@TEXT"/>"
		<xsl:apply-templates select="../@ID" />
	}
  <xsl:apply-templates select="node[not(@LINK)]" />
</xsl:template>

<xsl:template match="@ID">
	, "broader": ["<xsl:value-of select="." />"]
</xsl:template>

</xsl:stylesheet>
