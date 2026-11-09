import { ArrowUpRight } from 'lucide-react'
import '../../styles/about/LetsBuildFuture.css'
import '../../styles/about/LetsBuildFutureTheme.css'

function LetsBuildFuture() {
  return <section className="lets-build-future" aria-labelledby="future-title">
    <div className="lets-build-future__backprint">NEXT<br />NEXT<br />NEXT</div>
    <div className="lets-build-future__top"><span>YOURTECH® / 005</span><span>THE BACK COVER</span><span>RIYADH → WORLD</span></div>
    <div className="lets-build-future__content">
      <p className="lets-build-future__kicker">A GOOD IDEA SHOULD NOT WAIT</p>
      <h2 id="future-title">Shape what’s<br /><em>next.</em></h2>
      <a className="lets-build-future__button" href="mailto:hello@yourtech.com"><span>START A CONVERSATION</span><b><ArrowUpRight size={25} /></b></a>
    </div>
    <div className="lets-build-future__orbit" aria-hidden="true"><span>YOUR IDEA</span><i>✳</i></div>
    <footer className="lets-build-future__footer"><span>STRATEGY / DESIGN / TECHNOLOGY</span><span>HELLO@YOURTECH.COM</span></footer>
  </section>
}

export default LetsBuildFuture
