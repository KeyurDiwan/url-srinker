const express = require( 'express' );
const mongoose = require( 'mongoose' );
const app = express();
const ShortUrl = require( './model/shortUrl' );



mongoose.connect( 'mongodb://localhost/pr' );

app.set( 'view engine', 'ejs' );

app.use(express.urlencoded({ extended: true }));


app.get( '/',  async ( req, res ) => {

    const shortUrls = await ShortUrl.find();
    res.render( 'index', {shortUrls: shortUrls} );

} );

app.post( '/shortUrl', async ( req, res ) => {

    await ShortUrl.create( { full: req.body.fullUrl } );
    res.redirect( '/' );
} );


app.get( '/:shortUrl', async ( req, res ) => {
    
const sshortUrl =  await ShortUrl.findOne({short: req.params.shortUrl})

    if ( sshortUrl == null ) return res.sendStatus( 404 );

    sshortUrl.clicks++;
    sshortUrl.save();

    res.redirect( sshortUrl.full );
} );

app.listen( 3000, () => {
    console.log( 'Server is running on port 3000' );
} );