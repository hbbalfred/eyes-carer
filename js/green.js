
function setcolor( elem, col, enable )
{
	if( enable ) elem.style.background = col;

	if( elem.childNodes )
	{
		for( var i = elem.childNodes.length; i--; )
		{
			var child = realchild( elem.childNodes[ i ] );
			if( !child ) continue;
			if( child.tagName.toLowerCase() === 'body' ) setcolor( child, col, true );
			else if( white( getcolor( child ) ) ) setcolor( child, col, true );
			else setcolor( child, col, false  );
		}
	}
}

function realchild( elem )
{
	if( !elem.tagName ) return null;

	var tagName = elem.tagName.toLowerCase();
	if( 'frame' === tagName || 'iframe' === tagName )
	{
		return elem.contentDocument.body;
	}
	return elem;
}

function getcolor( elem )
{
	var d = elem.ownerDocument.defaultView;
	if(!d) return bgc( elem );

	d = d.getComputedStyle( elem, null );
	if(!d) return bgc( elem );

	d = d.getPropertyValue( 'background-color' );
	if(!d) return bgc( elem );

	return d;
}

function bgc( elem )
{
	if( !elem.style ) return '';
	return elem.style.getPropertyValue( 'background-color' );
}

function white( str )
{
	if( !str ) return false;
	str = str.toLowerCase();
	if( str == '#fff' ) return true;
	if( str == '#ffffff' ) return true;
	if( str.indexOf('rgb(255, 255, 255)') > -1 ) return true;
	if( str.indexOf('white') > -1 ) return true;
	return false;
}

setcolor( document.body, '#cce8cf', true );
