import '../../styles/about/WhoWeAre.css'
import '../../styles/about/WhoWeAreMagazine.css'
import '../../styles/about/WhoWeAreLayout.css'

function WhoWeAre() {
  return <section className="who-we-are" aria-labelledby="who-we-are-title">
    <div className="who-we-are__grid" />
    <header className="who-we-are__header"><span>YOURTECH® / 002</span><span>WHO WE ARE</span><span>RIYADH — 24°38′N</span></header>
    <div className="who-we-are__stage">
      <aside className="who-we-are__rail"><span>ABOUT THE STUDIO</span><b>SCROLL TO EXPLORE ↓</b></aside>
      <div className="who-we-are__copy"><p className="who-we-are__kicker">A DIGITAL CULTURE STUDIO</p><h2 id="who-we-are-title">We make<br /><em>the unseen</em><br />visible.</h2><p className="who-we-are__lead">A small, sharp team turning ambitious ideas into identities, products, and places people want to enter.</p><div className="who-we-are__manifesto"><span>01 / THINK DEEP</span><span>02 / MAKE CLEAR</span><span>03 / MOVE PEOPLE</span></div></div>
      <div className="who-we-are__note"><span>THE SHORT VERSION</span><p>Strategy is the spark.<br />Design gives it a body.<br />Technology lets it move.</p><b>✳</b></div>
    </div>
    <footer className="who-we-are__footer"><span>STRATEGY / IDENTITY / PRODUCT / ENGINEERING</span><span>YOURTECH® — BUILT TO MOVE</span></footer>
  </section>
}

export default WhoWeAre
