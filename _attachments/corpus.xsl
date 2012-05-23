<?xml version="1.0" encoding="utf-8"?>
<!-- 
Author: Aurelien Benel, 2012
License: AGPL
-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" encoding="utf-8"/>
<xsl:param name="corpus" select="generate-id()"/>

<xsl:key name="item" match="node" use="@LINK"/>

<xsl:template match="/">
  { "docs": [
    <xsl:for-each select="//node[generate-id(.)=generate-id(key('item', @LINK)[1])]">
      {
        "_id": "<xsl:value-of select="substring-after(@LINK, 'entity/')"/>",
        "item_corpus": "<xsl:value-of select="$corpus"/>",
        "topics": {
          <xsl:for-each select="key('item', @LINK)">
            "<xsl:value-of select="../@ID"/>": {
              "viewpoint": "<xsl:value-of select="generate-id(/map/node)"/>"
            }<xsl:if test="position()!=last()">,</xsl:if>
          </xsl:for-each>
        }
      }<xsl:if test="position()!=last()">,</xsl:if>
    </xsl:for-each>
  ]}
</xsl:template>

</xsl:stylesheet>
