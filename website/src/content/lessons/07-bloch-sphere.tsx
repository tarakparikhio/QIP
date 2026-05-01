'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson07Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="Spherical Parameterization">
          <NotationBox.Text>
            Every pure single-qubit state can be written using two real angles <InlineMath math="\theta \in [0, \pi]" /> and <InlineMath math="\phi \in [0, 2\pi)" />:
          </NotationBox.Text>
          <NotationBox.Formula math="|\psi\rangle = \cos\!\frac{\theta}{2}|0\rangle + e^{i\phi}\sin\!\frac{\theta}{2}|1\rangle" />
          <NotationBox.Text>
            The global phase is absorbed into the parameterization, so this form is unique for every physically distinct state.
          </NotationBox.Text>
        </NotationBox.Item>

        <NotationBox.Item heading="Bloch Vector">
          <NotationBox.Text>
            The state above maps to a unit vector on the sphere <InlineMath math="S^2 \subset \mathbb{R}^3" />:
          </NotationBox.Text>
          <NotationBox.Code>
            <NotationBox.Row math="\hat{r} = (\sin\theta\cos\phi,\ \sin\theta\sin\phi,\ \cos\theta)" label="Bloch vector" />
            <NotationBox.Row math="|0\rangle \leftrightarrow (0, 0, +1)" label="north pole" />
            <NotationBox.Row math="|1\rangle \leftrightarrow (0, 0, -1)" label="south pole" />
            <NotationBox.Row math="|{+}\rangle \leftrightarrow (+1, 0, 0)" label="equator, +x axis" />
          </NotationBox.Code>
        </NotationBox.Item>

        <NotationBox.Item heading="Rotation Gates">
          <NotationBox.List items={[
            { term: 'Rz(φ)', description: <>Rotation by angle <InlineMath math="\phi" /> about the z-axis. Matrix: <InlineMath math="\operatorname{diag}(e^{-i\phi/2}, e^{i\phi/2})" />.</> },
            { term: 'Ry(θ)', description: <>Rotation by angle <InlineMath math="\theta" /> about the y-axis. Matrix: <InlineMath math="\begin{pmatrix}\cos\theta/2 & -\sin\theta/2\\\sin\theta/2 & \cos\theta/2\end{pmatrix}" />.</> },
            { term: 'Euler decomposition', description: <>Any single-qubit gate: <InlineMath math="U = e^{i\alpha}R_z(\beta)R_y(\gamma)R_z(\delta)" />.</> },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>7.1 — Every Qubit State as a Point on the Sphere</h2>
      <p>
        The state space of a single qubit is a two-dimensional complex vector space. After normalizing (<InlineMath math="|\alpha|^2 + |\beta|^2 = 1" />) and factoring out the unobservable global phase, the remaining degrees of freedom reduce to exactly two real numbers: <InlineMath math="\theta" /> and <InlineMath math="\phi" />.
      </p>
      <p>
        This two-parameter family is in bijection with the surface of a unit sphere in <InlineMath math="\mathbb{R}^3" />, called the <strong>Bloch sphere</strong>. Every physically distinct pure qubit state corresponds to a unique point on this sphere, and every point corresponds to a valid qubit state.
      </p>
      <p>
        The mapping is:
      </p>
      <BlockMath math="|\psi\rangle = \cos\!\tfrac{\theta}{2}|0\rangle + e^{i\phi}\sin\!\tfrac{\theta}{2}|1\rangle \;\longleftrightarrow\; \hat{r} = \begin{pmatrix}\sin\theta\cos\phi\\\sin\theta\sin\phi\\\cos\theta\end{pmatrix}" />
      <p>
        The polar angle <InlineMath math="\theta" /> controls the probability of each outcome: at the north pole <InlineMath math="(\theta=0)" />, <InlineMath math="P(|0\rangle)=1" />; at the south pole <InlineMath math="(\theta=\pi)" />, <InlineMath math="P(|1\rangle)=1" />; on the equator <InlineMath math="(\theta=\pi/2)" />, <InlineMath math="P(|0\rangle) = P(|1\rangle) = \frac{1}{2}" />. The azimuthal angle <InlineMath math="\phi" /> encodes the relative phase.
      </p>

      <h2>7.2 — Gates as Rotations</h2>
      <p>
        Every unitary gate <InlineMath math="U" /> acts on the Bloch vector as a <strong>rotation</strong> in <InlineMath math="\mathbb{R}^3" />. This is because the map from <InlineMath math="2\times 2" /> unitaries to <InlineMath math="\mathbb{R}^3" /> rotations (via the Pauli matrices as a basis) is the double cover <InlineMath math="SU(2) \to SO(3)" />.
      </p>
      <p>
        The rotation axis and angle for each Pauli gate:
      </p>
      <ol>
        <li><strong>X gate</strong>: rotation by <InlineMath math="\pi" /> about the <InlineMath math="\hat{x}" /> axis. Maps <InlineMath math="|0\rangle \to |1\rangle" /> (north pole → south pole).</li>
        <li><strong>Z gate</strong>: rotation by <InlineMath math="\pi" /> about the <InlineMath math="\hat{z}" /> axis. Moves the Bloch vector within the plane, changing <InlineMath math="\phi \to \phi + \pi" />.</li>
        <li><strong>Y gate</strong>: rotation by <InlineMath math="\pi" /> about the <InlineMath math="\hat{y}" /> axis.</li>
        <li><strong>H gate</strong>: rotation by <InlineMath math="\pi" /> about the <InlineMath math="(\hat{x}+\hat{z})/\sqrt{2}" /> axis. Maps north pole → <InlineMath math="+\hat{x}" /> equator.</li>
        <li><strong>S gate</strong>: rotation by <InlineMath math="\pi/2" /> about the <InlineMath math="\hat{z}" /> axis. Advances <InlineMath math="\phi" /> by a quarter turn.</li>
      </ol>
      <p>
        The general rotation about an arbitrary axis <InlineMath math="\hat{n}" /> by angle <InlineMath math="\theta" /> is:
      </p>
      <BlockMath math="R_{\hat{n}}(\theta) = e^{-i\theta\hat{n}\cdot\vec{\sigma}/2} = \cos\!\tfrac{\theta}{2}\,I - i\sin\!\tfrac{\theta}{2}\,(\hat{n}\cdot\vec{\sigma})" />
      <p>
        where <InlineMath math="\vec{\sigma} = (X, Y, Z)" /> is the vector of Pauli matrices.
      </p>

      <h2>7.3 — The Euler Decomposition</h2>
      <p>
        Any single-qubit gate can be decomposed into at most three rotations (Euler angles). The standard decomposition uses z-y-z rotations:
      </p>
      <BlockMath math="U = e^{i\alpha} R_z(\beta)\, R_y(\gamma)\, R_z(\delta)" />
      <p>
        where <InlineMath math="\alpha, \beta, \gamma, \delta \in \mathbb{R}" />. This is always possible because <InlineMath math="SO(3)" /> is parameterized by three real numbers.
      </p>
      <p>
        Step-by-step construction for the Hadamard gate:
      </p>
      <ol>
        <li>Target: <InlineMath math="H = \frac{1}{\sqrt{2}}\begin{pmatrix}1&1\\1&-1\end{pmatrix}" /></li>
        <li>H is a rotation by <InlineMath math="\pi" /> about <InlineMath math="(\hat{x}+\hat{z})/\sqrt{2}" /></li>
        <li>Decompose: <InlineMath math="H = e^{i\pi/2} R_z(0) R_y(\pi/2) R_z(\pi)" /></li>
        <li>Or equivalently: <InlineMath math="H = \frac{1}{\sqrt{2}}(X + Z)" /></li>
      </ol>

      <h2>7.4 — Why Global Phase Is Unobservable</h2>
      <p>
        The parameterization <InlineMath math="|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle" /> absorbs the global phase. Two states that differ only by a global phase factor <InlineMath math="e^{i\alpha}" /> are physically identical:
      </p>
      <BlockMath math="e^{i\alpha}|\psi\rangle \text{ and } |\psi\rangle \text{ give identical measurement outcomes for every observable.}" />
      <p>
        Proof: for any Hermitian observable <InlineMath math="A" />, the expectation value is <InlineMath math="\langle A \rangle = \langle\psi|e^{-i\alpha} A e^{i\alpha}|\psi\rangle = \langle\psi|A|\psi\rangle" />. The global phase cancels.
      </p>
      <p>
        On the Bloch sphere, this means the map from states to sphere points is many-to-one: both <InlineMath math="|\psi\rangle" /> and <InlineMath math="e^{i\alpha}|\psi\rangle" /> map to the same point <InlineMath math="\hat{r}" />. The sphere captures exactly the physically distinct states, without redundancy.
      </p>

      <TryIt heading="7.5 — Try It: Navigate the Bloch Sphere">
        <p>
          Observe the Bloch sphere in the playground as you apply gates. Start from <InlineMath math="|0\rangle" /> (north pole) and trace the following path:
        </p>
        <ol>
          <li>Apply <strong>H</strong> — vector moves from north pole to <InlineMath math="+\hat{x}" /> on the equator.</li>
          <li>Apply <strong>Z</strong> — vector flips to <InlineMath math="-\hat{x}" /> (still on equator). State becomes <InlineMath math="|{-}\rangle" />.</li>
          <li>Apply <strong>H</strong> — vector returns to south pole <InlineMath math="-\hat{z}" />. State is now <InlineMath math="|1\rangle" />.</li>
        </ol>
        <p>
          This sequence implements <InlineMath math="HZH = X" /> — the bit flip gate — verified geometrically as a rotation path on the sphere.
        </p>
      </TryIt>
    </>
  );
}
