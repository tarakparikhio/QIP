'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox } from '@/components/lesson';
import ShotLab from '@/components/labs/ShotLab';

export default function Lesson36Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="What BB84 does">
          <NotationBox.Text>
            BB84 is a quantum key-distribution protocol. It lets two parties detect disturbance while establishing shared random key material over a quantum channel and a public classical channel.
          </NotationBox.Text>
        </NotationBox.Item>
        <NotationBox.Item heading="Two incompatible bases">
          <NotationBox.List items={[
            { term: 'Z basis', description: 'The computational basis, |0> and |1>.' },
            { term: 'X basis', description: 'The Hadamard basis, |+> and |->.' },
            { term: 'Sifting', description: 'Keeping only positions where the sender and receiver used compatible bases.' },
          ]} />
        </NotationBox.Item>
        <NotationBox.Item heading="Security boundary">
          <NotationBox.Text>
            The textbook security argument assumes an idealized protocol with authenticated classical communication and carefully modeled devices. A teaching circuit is not a security proof or a production cryptographic implementation.
          </NotationBox.Text>
        </NotationBox.Item>
      </NotationBox>

      <h2>36.1 - Encode in a randomly chosen basis</h2>
      <p>
        Alice chooses a random bit and a random basis for each transmitted signal. In the Z basis she sends <InlineMath math="|0\rangle" /> or <InlineMath math="|1\rangle" />. In the X basis she sends <InlineMath math="|+\rangle" /> or <InlineMath math="| - \rangle" />.
      </p>
      <p>
        Bob independently chooses a random measurement basis. When he chooses the same basis as Alice, the ideal result agrees. When he chooses the other basis, the result is random even without an eavesdropper.
      </p>

      <h2>36.2 - Detect disturbance</h2>
      <p>
        Alice and Bob publicly compare a sample of their basis choices and outcomes. An intercept-and-resend eavesdropper does not know the correct basis for every signal. Measuring in the wrong basis and resending changes the statistics of the checked sample.
      </p>
      <BlockMath math="\Pr(\text{error on kept bit}\mid\text{intercept-resend})=\frac{1}{4}" />
      <p>
        The value above is for the simple idealized attack and standard BB84 basis choices. Real security analysis also includes channel noise, finite samples, authentication, privacy amplification, and device assumptions.
      </p>

      <p>
        Where the 1/4 comes from: on a kept bit, Alice and Bob used the same basis. Eve guesses that basis wrong half the time. When she is wrong, the state she resends is a superposition in Bob&apos;s basis, so Bob&apos;s result is a coin flip and wrong half the time. So the error rate is <InlineMath math="\tfrac12 \times \tfrac12 = \tfrac14" />. If Eve attacks only a fraction <InlineMath math="f" /> of the signals, it is <InlineMath math="f/4" />.
      </p>

      <h2>36.3 - A worked run of eight signals</h2>
      <div className="not-prose my-6 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-xs font-mono uppercase tracking-wider text-muted">
              <th className="py-2 pr-3">#</th><th className="py-2 pr-3">Alice bit</th><th className="py-2 pr-3">Alice basis</th><th className="py-2 pr-3">State sent</th><th className="py-2 pr-3">Bob basis</th><th className="py-2 pr-3">Bob result</th><th className="py-2">Kept?</th>
            </tr>
          </thead>
          <tbody className="font-mono text-foreground/85">
            <tr className="border-b border-border/30"><td className="py-1.5 pr-3">1</td><td>0</td><td>Z</td><td><InlineMath math="|0\rangle" /></td><td>Z</td><td>0</td><td>yes</td></tr>
            <tr className="border-b border-border/30"><td className="py-1.5 pr-3">2</td><td>1</td><td>X</td><td><InlineMath math="|-\rangle" /></td><td>Z</td><td>random</td><td>no</td></tr>
            <tr className="border-b border-border/30"><td className="py-1.5 pr-3">3</td><td>1</td><td>Z</td><td><InlineMath math="|1\rangle" /></td><td>X</td><td>random</td><td>no</td></tr>
            <tr className="border-b border-border/30"><td className="py-1.5 pr-3">4</td><td>0</td><td>X</td><td><InlineMath math="|+\rangle" /></td><td>X</td><td>0</td><td>yes</td></tr>
            <tr className="border-b border-border/30"><td className="py-1.5 pr-3">5</td><td>1</td><td>Z</td><td><InlineMath math="|1\rangle" /></td><td>Z</td><td>1</td><td>yes</td></tr>
            <tr className="border-b border-border/30"><td className="py-1.5 pr-3">6</td><td>0</td><td>Z</td><td><InlineMath math="|0\rangle" /></td><td>X</td><td>random</td><td>no</td></tr>
            <tr className="border-b border-border/30"><td className="py-1.5 pr-3">7</td><td>1</td><td>X</td><td><InlineMath math="|-\rangle" /></td><td>X</td><td>1</td><td>yes</td></tr>
            <tr><td className="py-1.5 pr-3">8</td><td>0</td><td>X</td><td><InlineMath math="|+\rangle" /></td><td>Z</td><td>random</td><td>no</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        After announcing bases (not bits), they keep rounds 1, 4, 5, and 7, giving the shared key 0011. On average half the rounds survive, since bases match with probability 1/2. Now imagine Eve measured round 5 in the X basis: she gets a random result and resends <InlineMath math="|+\rangle" /> or <InlineMath math="|-\rangle" />, so Bob&apos;s Z measurement gives 1 only half the time. That is the disturbance Alice and Bob look for.
      </p>

      <h2>36.4 - Estimating the error rate is a statistics problem</h2>
      <p>
        Alice and Bob sacrifice a random sample of <InlineMath math="n" /> kept bits and compare them publicly. The observed error fraction <InlineMath math="\hat p" /> estimates the true quantum bit error rate (QBER) with standard error <InlineMath math="\sqrt{\hat p(1-\hat p)/n}" />. For example, 22 errors in 200 checked bits gives <InlineMath math="\hat p = 0.11 \pm 0.043" /> at 95% confidence.
      </p>
      <p>
        For BB84 with standard one-way post-processing, a secure key can be distilled only if the QBER is below about 11% (the Shor–Preskill bound). Near that line, a small sample cannot tell &ldquo;safe&rdquo; from &ldquo;abort,&rdquo; so real systems check thousands of bits, and security proofs explicitly account for this finite-sample uncertainty. Use the lab to see how many checked bits it takes to pin the error rate down.
      </p>
      <ShotLab eventName="error" title="How many bits must you check?" />

      <h2>36.5 - What quantum mechanics contributes</h2>
      <p>
        The protocol does not depend on a mysterious ability to hide a message from all observation. It depends on incompatible measurements and the fact that an unknown quantum state cannot be copied perfectly. The parties test for disturbance before treating the remaining bits as usable key material.
      </p>
      <p>
        Quantum key distribution also does not replace encryption by itself. After reconciliation and privacy amplification, the final key must still be used with an authenticated classical cryptographic protocol.
      </p>
    </>
  );
}
