'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox } from '@/components/lesson';

export default function Lesson38Content() {
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

      <h2>38.1 - Encode in a randomly chosen basis</h2>
      <p>
        Alice chooses a random bit and a random basis for each transmitted signal. In the Z basis she sends <InlineMath math="|0\rangle" /> or <InlineMath math="|1\rangle" />. In the X basis she sends <InlineMath math="|+\rangle" /> or <InlineMath math="| - \rangle" />.
      </p>
      <p>
        Bob independently chooses a random measurement basis. When he chooses the same basis as Alice, the ideal result agrees. When he chooses the other basis, the result is random even without an eavesdropper.
      </p>

      <h2>38.2 - Detect disturbance</h2>
      <p>
        Alice and Bob publicly compare a sample of their basis choices and outcomes. An intercept-and-resend eavesdropper does not know the correct basis for every signal. Measuring in the wrong basis and resending changes the statistics of the checked sample.
      </p>
      <BlockMath math="\Pr(\text{error on kept bit}\mid\text{intercept-resend})=\frac{1}{4}" />
      <p>
        The value above is for the simple idealized attack and standard BB84 basis choices. Real security analysis also includes channel noise, finite samples, authentication, privacy amplification, and device assumptions.
      </p>

      <h2>38.3 - What quantum mechanics contributes</h2>
      <p>
        The protocol does not depend on a mysterious ability to hide a message from all observation. It depends on incompatible measurements and the fact that an unknown quantum state cannot be copied perfectly. The parties test for disturbance before treating the remaining bits as usable key material.
      </p>
      <p>
        Quantum key distribution also does not replace encryption by itself. After reconciliation and privacy amplification, the final key must still be used with an authenticated classical cryptographic protocol.
      </p>
    </>
  );
}
