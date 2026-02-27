
<div style="text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 100px 0;">

<p style="font-size: 1.2rem; letter-spacing: 0.3rem; text-transform: uppercase; color: #00A6D6; font-weight: 300; margin-bottom: 20px;">
Delft Engineering Academy
</p>

<hr style="width: 50px; border: 1px solid #00A6D6; margin: 20px auto;">

<h1 style="font-size: 3.5rem; font-weight: 700; color: #1a1a1a; margin-top: 40px; margin-bottom: 10px; line-height: 1.1;">
MASTER BOOK - Questions for Technical Examination & Evaluation Guide

</h2>

<div style="margin: 100px 0;">
    
</div>

<div style="text-align: left; max-width: 400px; margin: 0 auto; border-left: 2px solid #00A6D6; padding-left: 20px; color: #444;">
    <p style="margin: 5px 0;"><strong>Subject:</strong> Aerospace Engineering & Sciences</p>
    <p style="margin: 5px 0;"><strong>Modules:</strong> Mathematics, Physics, Aero-Engineering</p>
     <p style="margin: 5px 0;"><strong>Academic Year:</strong> 2025/2026</p>
</div>

<div style="page-break-after: always;"></div>

<div style="page-break-after: always;"></div>

# TU Delft Engineering Academy: Master Book
## (Proctortrack Edition)

### 📑 Course Structure & ID Reference

This matrix serves as a definitive reference guide to locate specific topics and key formulas within the Master Book. The IDs correspond exactly to the database used in the Exam Simulator.

| Section | Block | ID Range | Major Topics & Key Formulas Covered |
| :--- | :--- | :--- | :--- |
| **I. Mathematics** | **Maths I** | m-01 to m-25 | **Calculus & Vector Algebra:** Derivatives, Unit Vectors, and Limits. |
| | **Maths II** | m-26 to m-50 | **Advanced Geometry:** Integrals, L'Hôpital's Rule, and 3D Coordinates. |
| | **Maths III** | m-51 to m-75 | **Algebra & Statistics:** Matrices, Probability, and Logarithms. |
| **II. Physics** | **Physics I** | p-01 to p-25 | **Mechanics & Optics:** Newton's Laws ($F=ma$), Energy, and Lens Equations. |
| | **Physics II** | p-26 to p-50 | **Thermodynamics & EM:** Ideal Gases ($PV=nRT$), Circuits, and Magnetism. |
| | **Physics III** | p-51 to p-75 | **Modern Physics:** Photons, Radioactive Decay, and Logic Gates. |
| **III. Aero Eng.** | **Aero I** | ae-01 to ae-25 | **Flight Loads:** V-n Diagrams, Safety Factors, and Speed Regimes. |
| | **Aero II** | ae-26 to ae-50 | **Stability & Control:** CG, Neutral Point, and Control Surfaces. |
| | **Aero III** | ae-51 to ae-75 | **Structures:** Stress/Strain, Wing Layout (Spars/Ribs), and Torsion. |
| | **Aero IV** | ae-76 to ae-100 | **Materials & Fatigue:** S-N Curves, CFRP, and Structural Integrity. |

<div style="page-break-after: always;"></div>
<div style="page-break-after: always;"></div>


<div style="page-break-after: always;"></div>

# Mathematics I: Calculus & Vector Algebra

**m-01. Evaluate the derivative of $f(x) = \frac{x^2}{\ln(x)}$.**

* A) $2x / \ln(x)$
* B) $(2x \ln(x) - x) / \ln(x)$
* **C) $(2x \ln(x) - x) / \ln^2(x)$**
* D) $x / \ln(x)$
* **Rationale:** To solve this, apply the **Quotient Rule**: $\frac{d}{dx} [\frac{u}{v}] = \frac{u'v - uv'}{v^2}$. Let $u = x^2$ (so $u' = 2x$) and $v = \ln(x)$ (so $v' = 1/x$). The derivative is: $\frac{(2x)(\ln(x)) - (x^2)(\frac{1}{x})}{(\ln(x))^2} = \frac{2x \ln(x) - x}{\ln^2(x)}$.

**m-02. Find the dot product of $\mathbf{A} = 3\mathbf{i} - 2\mathbf{j} + \mathbf{k}$ and $\mathbf{B} = \mathbf{i} + 4\mathbf{j} - 2\mathbf{k}$.**

* A) 5
* **B) -7**
* C) 10
* D) -12
* **Rationale:** The dot product is the sum of the products of the components: $(A_x B_x) + (A_y B_y) + (A_z B_z)$. Calculation: $(3 \cdot 1) + (-2 \cdot 4) + (1 \cdot -2) = 3 - 8 - 2 = -7$.

**m-03. Calculate the definite integral of $\sin(x)\cos(x)$ from $0$ to $\pi/2$.**

* **A) $1/2$**
* B) 1
* C) 0
* D) $\pi/4$
* **Rationale:** Using the trigonometric identity $\sin(x)\cos(x) = \frac{1}{2}\sin(2x)$, the integral becomes $\int_{0}^{\pi/2} \frac{1}{2}\sin(2x) dx$. The antiderivative is $-\frac{1}{4}\cos(2x)$. Evaluating from $0$ to $\pi/2$: $[-\frac{1}{4}\cos(\pi)] - [-\frac{1}{4}\cos(0)] = [-\frac{1}{4}(-1)] - [-\frac{1}{4}(1)] = \frac{1}{4} + \frac{1}{4} = \frac{1}{2}$.

**m-04. What is the domain of the function $f(x) = \sqrt{4 - x^2}$?**

* A) $x > 2$
* B) $x \geq 0$
* **C) $-2 \leq x \leq 2$**
* D) All real numbers
* **Rationale:** For a square root to yield a real number, the radicand must be non-negative: $4 - x^2 \geq 0$. This simplifies to $x^2 \leq 4$, which means $|x| \leq 2$ or $-2 \leq x \leq 2$.

**m-05. What is the magnitude of the vector $\mathbf{v} = (4, -3, 12)$?**

* A) 10
* **B) 13**
* C) 15
* D) $\sqrt{150}$
* **Rationale:** The magnitude (length) of a 3D vector is calculated using the formula $||\mathbf{v}|| = \sqrt{x^2 + y^2 + z^2}$. Calculation: $\sqrt{4^2 + (-3)^2 + 12^2} = \sqrt{16 + 9 + 144} = \sqrt{169} = 13$.

**m-06. Find the limit as $x$ approaches $0$ of $\frac{\sin(5x)}{x}$.**

* A) 0
* B) 1
* **C) 5**
* D) Indeterminate
* **Rationale:** Using the fundamental limit theorem $\lim_{u \to 0} \frac{\sin(u)}{u} = 1$. Multiply and divide by 5: $\lim_{x \to 0} 5 \cdot \frac{\sin(5x)}{5x} = 5 \cdot 1 = 5$. Alternatively, applying L'Hôpital's Rule: $\lim_{x \to 0} \frac{5\cos(5x)}{1} = 5$.

**m-07. Which of the following is a unit vector in the direction of $(1, 1)$?**

* A) $(1/2, 1/2)$
* **B) $(1/\sqrt{2}, 1/\sqrt{2})$**
* C) $(1, 0)$
* D) $(2, 2)$
* **Rationale:** A unit vector is found by dividing a vector by its magnitude. The magnitude of $(1, 1)$ is $\sqrt{1^2 + 1^2} = \sqrt{2}$. Dividing each component by $\sqrt{2}$ gives $(1/\sqrt{2}, 1/\sqrt{2})$.

**m-08. Evaluate the integral of $e^{3x+1} dx$.**

* **A) $\frac{1}{3}e^{3x+1} + C$**
* B) $3e^{3x+1} + C$
* C) $e^{3x+1} + C$
* D) $\frac{1}{3}e^x + C$
* **Rationale:** This follows the rule $\int e^{ax+b} dx = \frac{1}{a}e^{ax+b} + C$. Here, $a=3$, so the integral is $\frac{1}{3}e^{3x+1} + C$.

**m-09. If $\sin(\theta) = 3/5$ and $\theta$ is in the second quadrant, find $\cos(\theta)$.**

* A) $4/5$
* **B) $-4/5$**
* C) $-3/4$
* D) 1
* **Rationale:** Using the identity $\sin^2(\theta) + \cos^2(\theta) = 1$: $\cos^2(\theta) = 1 - (3/5)^2 = 1 - 9/25 = 16/25$. So $\cos(\theta) = \pm 4/5$. Since $\theta$ is in the second quadrant (where x-coordinates are negative), $\cos(\theta)$ must be $-4/5$.

**m-10. The slope of the tangent line to $y = x^3 - 2x$ at $x = 1$ is:**

* A) 0
* **B) 1**
* C) 3
* D) -1
* **Rationale:** The slope of the tangent line is given by the derivative $y'$. $y' = 3x^2 - 2$. Evaluating at $x=1$: $3(1)^2 - 2 = 3 - 2 = 1$.

**m-11. The cross product $\mathbf{i} \times \mathbf{j}$ results in:**

* A) 0
* B) 1
* **C) $\mathbf{k}$**
* D) $-\mathbf{k}$
* **Rationale:** In a right-handed Cartesian coordinate system, the cross product of unit vectors follows a cyclic order: $\mathbf{i} \times \mathbf{j} = \mathbf{k}$, $\mathbf{j} \times \mathbf{k} = \mathbf{i}$, and $\mathbf{k} \times \mathbf{i} = \mathbf{j}$.

**m-12. Solve for $x$: $\log_2(x) + \log_2(x-2) = 3$.**

* A) 2
* **B) 4**
* C) -2, 4
* D) 8
* **Rationale:** Using log properties: $\log_2(x(x-2)) = 3$. Converting to exponential form: $x(x-2) = 2^3 \Rightarrow x^2 - 2x - 8 = 0$. Factoring: $(x-4)(x+2) = 0$. Solutions are $x=4$ and $x=-2$. However, $\log(x)$ is only defined for $x > 0$, so $x=4$ is the only valid solution.

**m-13. The derivative of $f(x) = \arctan(x)$ is:**

* **A) $1 / (1 + x^2)$**
* B) $1 / \sqrt{1 - x^2}$
* C) $\sec^2(x)$
* D) $1/x$
* **Rationale:** This is a standard derivative in calculus. It is derived using implicit differentiation where $y = \arctan(x) \Rightarrow \tan(y) = x$. Differentiating both sides gives $\sec^2(y) \frac{dy}{dx} = 1$, so $\frac{dy}{dx} = \frac{1}{\sec^2(y)} = \frac{1}{1+\tan^2(y)} = \frac{1}{1+x^2}$.

**m-14. The determinant of a $2 \times 2$ matrix with rows $[2, 3]$ and $[1, 4]$ is:**

* A) 11
* **B) 5**
* C) 8
* D) 2
* **Rationale:** For a matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the determinant is $ad - bc$. Calculation: $(2 \cdot 4) - (3 \cdot 1) = 8 - 3 = 5$.

**m-15. Evaluate the integral of $\frac{1}{x+3} dx$.**

* A) $-(x+3)^{-2}$
* **B) $\ln|x+3| + C$**
* C) $\frac{1}{2}(x+3)^2$
* D) $e^{x+3}$
* **Rationale:** The integral of $1/u du$ is $\ln|u| + C$. Letting $u = x+3$ (where $du = dx$), the integral is $\ln|x+3| + C$.

**m-16. If vectors $\mathbf{a}$ and $\mathbf{b}$ are parallel, their cross product $\mathbf{a} \times \mathbf{b}$ is:**

* **A) The zero vector**
* B) 1
* C) $||\mathbf{a}|| \cdot ||\mathbf{b}||$
* D) $\mathbf{a} \cdot \mathbf{b}$
* **Rationale:** The magnitude of the cross product is given by $||\mathbf{a} \times \mathbf{b}|| = ||\mathbf{a}|| \cdot ||\mathbf{b}|| \cdot \sin(\theta)$. If vectors are parallel, the angle $\theta$ between them is $0^\circ$ or $180^\circ$. Since $\sin(0) = 0$, the resulting magnitude is 0, yielding the zero vector.

**m-17. Find the second derivative $f''(x)$ if $f(x) = \sin(2x)$.**

* A) $2\cos(2x)$
* B) $-2\sin(2x)$
* **C) $-4\sin(2x)$**
* D) $4\cos(2x)$
* **Rationale:** First derivative $f'(x) = 2\cos(2x)$ (using the chain rule). Second derivative $f''(x) = 2 \cdot (-2\sin(2x)) = -4\sin(2x)$.

**m-18. What is the value of the limit $\lim_{x \to \infty} \frac{3x^2 - 5x}{2x^2 + 7}$?**

* A) 0
* B) $\infty$
* **C) $3/2$**
* D) $-5/7$
* **Rationale:** For limits at infinity of rational functions, we compare the highest powers of $x$. Dividing numerator and denominator by $x^2$: $\lim_{x \to \infty} \frac{3 - 5/x}{2 + 7/x^2} = \frac{3 - 0}{2 + 0} = 3/2$.

**m-19. Solve the differential equation $\frac{dy}{dx} = 3y$.**

* A) $y = 3x + C$
* **B) $y = Ce^{3x}$**
* C) $y = x^3 + C$
* D) $y = e^{x/3} + C$
* **Rationale:** This is a separable equation: $\int \frac{1}{y} dy = \int 3 dx$. This leads to $\ln|y| = 3x + K$. Taking the exponential of both sides: $y = e^{3x+K} = e^K \cdot e^{3x} = Ce^{3x}$.

**m-20. In a probability distribution, the sum of all probabilities must be:**

* A) 0
* B) Between 0 and 1
* **C) 1**
* D) $\infty$
* **Rationale:** By definition, the sum of probabilities for all possible mutually exclusive outcomes in a sample space must equal 1 (representing 100% certainty that one of the outcomes will occur).

**m-21. Find the area under the curve $y = x^2$ from $x=0$ to $x=3$.**

* **A) 9**
* B) 27
* C) 3
* D) 6
* **Rationale:** The area is the definite integral: $\int_{0}^{3} x^2 dx = [\frac{x^3}{3}]_{0}^{3}$. Evaluating at the limits: $\frac{3^3}{3} - \frac{0^3}{3} = \frac{27}{3} = 9$.



**m-22. If matrix $M = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$, what is its transpose $M^T$?**

* A) $\begin{pmatrix} 4 & 3 \\ 2 & 1 \end{pmatrix}$
* **B) $\begin{pmatrix} 1 & 3 \\ 2 & 4 \end{pmatrix}$**
* C) $\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$
* D) $\begin{pmatrix} -1 & -2 \\ -3 & -4 \end{pmatrix}$
* **Rationale:** The transpose is found by swapping rows and columns. Row 1 $(1, 2)$ becomes Column 1, and Row 2 $(3, 4)$ becomes Column 2.

**m-23. The Taylor series expansion of $e^x$ centered at 0 starts with:**

* A) $x + \frac{x^2}{2}$
* **B) $1 + x + \frac{x^2}{2!}$**
* C) $1 - x + \frac{x^2}{2!}$
* D) $x - \frac{x^3}{3!}$
* **Rationale:** The general Taylor series is $\sum \frac{f^{(n)}(0)}{n!}x^n$. Since all derivatives of $e^x$ are $e^x$ and $e^0 = 1$, the terms are $\frac{1}{0!} + \frac{x}{1!} + \frac{x^2}{2!} \dots = 1 + x + \frac{x^2}{2}$.

**m-24. What is the value of $\cos(\pi/3)$?**

* **A) $1/2$**
* B) $\frac{\sqrt{3}}{2}$
* C) $1$
* D) $0$
* **Rationale:** In the unit circle, $\pi/3$ radians is equivalent to $60^\circ$. The cosine of $60^\circ$ is $0.5$ or $1/2$.

**m-25. Find the unit vector normal to the surface $z = f(x, y)$ at a given point using:**

* A) The divergence
* **B) The gradient $\nabla f$**
* C) The curl
* D) The integral
* **Rationale:** The gradient vector $\nabla f$ at a point on a level surface is always perpendicular (normal) to the surface at that point. To find the unit vector, we divide the gradient by its magnitude.

<div style="page-break-after: always;"></div>

# 📐 Mathematics II: Advanced Geometry

**m-26. What is the value of the limit as x approaches infinity of $\frac{3x^2 + 2x}{5x^2 - 1}$?**
- A) 0
- **B) 3/5**
- C) Infinity
- D) 2/5
- **Rationale:** For limits at infinity of rational functions, we compare the leading terms of the highest power. Dividing both numerator and denominator by $x^2$: $\lim_{x \to \infty} \frac{3 + 2/x}{5 - 1/x^2} = \frac{3 + 0}{5 - 0} = 3/5$.

**m-27. If matrix A is a $3 \times 3$ matrix and $\det(A) = 4$, what is $\det(2A)$?**
- A) 8
- B) 12
- **C) 32**
- D) 64
- **Rationale:** For an $n \times n$ matrix, the property is $\det(kA) = k^n \cdot \det(A)$. For this $3 \times 3$ matrix ($n=3$): $2^3 \cdot 4 = 8 \cdot 4 = 32$.

**m-28. Find the derivative of $f(x) = e^{\sin(x)}$.**
- A) $e^{\sin(x)}$
- **B) $\cos(x)e^{\sin(x)}$**
- C) $-\cos(x)e^{\sin(x)}$
- D) $\sin(x)e^{\cos(x)}$
- **Rationale:** Applying the chain rule: $\frac{d}{dx}(e^u) = e^u \cdot \frac{du}{dx}$. Here $u = \sin(x)$ and $u' = \cos(x)$, resulting in $\cos(x)e^{\sin(x)}$.

**m-29. What is the area under the curve $y = 1/x$ from $x=1$ to $x=e$?**
- **A) 1**
- B) $e$
- C) $\ln(2)$
- D) 0
- **Rationale:** The area is given by the integral $\int_{1}^{e} \frac{1}{x} dx = [\ln|x|]_{1}^{e}$. Evaluation: $\ln(e) - \ln(1) = 1 - 0 = 1$.

**m-30. Two vectors are orthogonal if their:**
- A) Cross product is zero
- **B) Dot product is zero**
- C) Magnitudes are equal
- D) Sum is zero
- **Rationale:** Orthogonality implies a $90^\circ$ angle. Since $\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos(\theta)$ and $\cos(90^\circ) = 0$, the dot product must be zero.

**m-31. Solve for $x$: $\sin^2(x) + 2\cos(x) = 2$ for $0 \leq x < 2\pi$.**
- **A) 0**
- B) $\pi/2$
- C) $\pi$
- D) $3\pi/2$
- **Rationale:** Substitute $\sin^2(x) = 1 - \cos^2(x)$: $1 - \cos^2(x) + 2\cos(x) = 2 \Rightarrow \cos^2(x) - 2\cos(x) + 1 = 0$. This is a perfect square: $(\cos(x)-1)^2 = 0$. Thus $\cos(x)=1$, which occurs at $x=0$.

**32. The trace of a matrix is defined as:**
- A) The product of diagonal elements
- B) The sum of all elements
- **C) The sum of diagonal elements**
- D) The determinant
- **Rationale:** The trace $\text{Tr}(A)$ is the sum of the elements on the main diagonal: $\sum_{i=1}^{n} a_{ii}$.


**m-33. Evaluate the integral of $\cos(3x) dx$.**
- A) $3\sin(3x) + C$
- **B) $\frac{1}{3}\sin(3x) + C$**
- C) $-\frac{1}{3}\sin(3x) + C$
- D) $-3\sin(3x) + C$
- **Rationale:** Using $u$-substitution with $u=3x$ and $du=3dx$, the integral $\int \cos(3x) dx = \frac{1}{3}\int \cos(u) du = \frac{1}{3}\sin(3x) + C$.

**m-34. What is the period of the function $f(x) = \tan(2x)$?**
- A) $\pi$
- B) $2\pi$
- **C) $\pi/2$**
- D) $\pi/4$
- **Rationale:** The standard period of $\tan(x)$ is $\pi$. For $\tan(kx)$, the period is $\pi/k$. Here $k=2$, so the period is $\pi/2$.

**m-35. Find the unit normal vector to the surface at a point using:**
- A) The curl
- B) The divergence
- **C) The gradient**
- D) The integral
- **Rationale:** The gradient vector $\nabla f$ is always perpendicular to the level surface $f(x,y,z) = c$ at any given point.

**m-36. The inverse of a matrix A exists only if:**
- A) $\det(A) = 0$
- **B) $\det(A) \neq 0$**
- C) A is symmetric
- D) A is diagonal
- **Rationale:** A matrix is invertible (non-singular) if and only if its determinant is non-zero. If $\det(A)=0$, the matrix is singular and has no inverse.

**m-37. What is the derivative of $f(x) = \ln(x^2 + 1)$?**
- A) $1 / (x^2 + 1)$
- **B) $2x / (x^2 + 1)$**
- C) $x / (x^2 + 1)$
- D) $2 / (x^2 + 1)$
- **Rationale:** Using the chain rule $\frac{d}{dx}(\ln(u)) = \frac{1}{u} \cdot u'$. Here $u = x^2+1$ and $u' = 2x$, giving $2x / (x^2 + 1)$.

**m-38. In a right triangle, if the hypotenuse is 10 and one angle is $30^\circ$, the opposite side is:**
- **A) 5**
- B) $5\sqrt{3}$
- C) $10\sqrt{3}$
- D) 2.5
- **Rationale:** $\sin(30^\circ) = \frac{\text{Opposite}}{\text{Hypotenuse}}$. Therefore, $\text{Opposite} = 10 \cdot \sin(30^\circ) = 10 \cdot 0.5 = 5$.


**m-39. Calculate the limit as x approaches 0 of $\frac{e^x - 1}{x}$.**
- A) 0
- B) Infinity
- **C) 1**
- D) -1
- **Rationale:** This is the indeterminate form $0/0$. Applying L'Hôpital's Rule: $\lim_{x \to 0} \frac{e^x}{1} = e^0 = 1$.

**m-40. The position of a particle is given by $s(t) = t^3 - 6t^2$. When is the acceleration zero?**
- A) $t = 0$
- **B) $t = 2$**
- C) $t = 4$
- D) $t = 6$
- **Rationale:** Velocity $v(t) = s'(t) = 3t^2 - 12t$. Acceleration $a(t) = v'(t) = 6t - 12$. Set $6t - 12 = 0 \Rightarrow t = 2$.

**m-41. What is the value of $i^{10}$ (where $i$ is the imaginary unit)?**
- A) 1
- B) $i$
- **C) -1**
- D) $-i$
- **Rationale:** $i^2 = -1$. Therefore, $i^{10} = (i^2)^5 = (-1)^5 = -1$.

**m-42. Evaluate the integral of $x \cdot e^x dx$.**
- A) $xe^x + e^x + C$
- **B) $xe^x - e^x + C$**
- C) $\frac{1}{2}x^2e^x + C$
- D) $e^x + C$
- **Rationale:** Using Integration by Parts $\int u dv = uv - \int v du$ with $u=x$ and $dv=e^x dx$. Result: $xe^x - \int e^x dx = xe^x - e^x + C$.

**m-43. The product of a matrix and its inverse $(A \cdot A^{-1})$ results in:**
- A) The Zero matrix
- **B) The Identity matrix**
- C) Matrix A
- D) 1
- **Rationale:** By definition, $A \cdot A^{-1} = I$, where $I$ is the identity matrix.

**m-44. What is the derivative of $f(x) = \sin^2(x)$?**
- A) $\cos^2(x)$
- B) $2\sin(x)$
- **C) $\sin(2x)$**
- D) $-\sin(2x)$
- **Rationale:** $f'(x) = 2\sin(x)\cos(x)$. Using the double angle identity, $2\sin(x)\cos(x) = \sin(2x)$.

**m-45. In a 3D coordinate system, the equation $x^2 + y^2 + z^2 = 9$ represents:**
- A) A circle
- B) A cylinder
- **C) A sphere with radius 3**
- D) A sphere with radius 9
- **Rationale:** The equation of a sphere centered at the origin is $x^2 + y^2 + z^2 = r^2$. Here $r^2 = 9$, so $r = 3$.


**m-46. Calculate the work done by a force $\mathbf{F} = (2, 3)$ along a displacement $\mathbf{d} = (5, 4)$.**
- **A) 22**
- B) 10
- C) 12
- D) 7
- **Rationale:** Work is the dot product $W = \mathbf{F} \cdot \mathbf{d} = (2 \cdot 5) + (3 \cdot 4) = 10 + 12 = 22$.

**m-47. The complex number $1 + i$ in polar form is:**
- **A) $\sqrt{2}(\cos 45^\circ + i \sin 45^\circ)$**
- B) $2(\cos 45^\circ + i \sin 45^\circ)$
- C) $\sqrt{2}(\cos 90^\circ + i \sin 90^\circ)$
- D) $1(\cos 45^\circ + i \sin 45^\circ)$
- **Rationale:** Modulus $r = \sqrt{1^2 + 1^2} = \sqrt{2}$. Angle $\theta = \arctan(1/1) = 45^\circ$.


**m-48. Find the critical points of $f(x) = x^3 - 3x$.**
- A) $x = 0$
- B) $x = 1$
- **C) $x = 1, -1$**
- D) $x = 3$
- **Rationale:** Critical points occur where $f'(x) = 0$. $f'(x) = 3x^2 - 3$. Setting $3x^2 - 3 = 0 \Rightarrow x^2 = 1 \Rightarrow x = \pm 1$.

**m-49. Evaluate the integral of $\frac{1}{\sqrt{1 - x^2}} dx$.**
- A) $\arctan(x) + C$
- **B) $\arcsin(x) + C$**
- C) $\ln(x) + C$
- D) $\arccos(x) + C$
- **Rationale:** This is the standard integral form for the inverse sine function: $\int \frac{1}{\sqrt{1-x^2}} dx = \arcsin(x) + C$.

**m-50. Two non-zero vectors $\mathbf{u}$ and $\mathbf{v}$ are parallel if:**
- A) $\mathbf{u} \cdot \mathbf{v} = 0$
- **B) $\mathbf{u} \times \mathbf{v} = 0$**
- C) $\mathbf{u} + \mathbf{v} = 0$
- D) $\mathbf{u} = \mathbf{v}$
- **Rationale:** For parallel vectors, the angle $\theta$ is $0^\circ$ or $180^\circ$. Since $|\mathbf{u} \times \mathbf{v}| = |\mathbf{u}||\mathbf{v}|\sin(\theta)$ and $\sin(0^\circ) = 0$, the cross product is zero.

<div style="page-break-after: always;"></div>

# 📐 Mathematics III: Algebra & Statistics

**m-51. The value of $\cos(\pi/3)$ is:**
- **A) 1/2**
- B) $\sqrt{3}/2$
- C) $1/\sqrt{2}$
- D) 1
- **Rationale:** $\pi/3$ radians is equivalent to $60^\circ$. In the unit circle, the x-coordinate for $60^\circ$ is $1/2$.


**m-52. Find the limit as $x$ approaches 1 of $\frac{x^2 - 1}{x - 1}$.**
- A) 0
- B) 1
- **C) 2**
- D) Indeterminate
- **Rationale:** Factoring the numerator as a difference of squares gives $\frac{(x-1)(x+1)}{x-1}$. After canceling the $(x-1)$ terms, we evaluate $\lim_{x \to 1} (x+1) = 1+1 = 2$.

**m-53. A matrix is symmetric if:**
- A) $A = -A$
- **B) $A = A^T$**
- C) $A = I$
- D) $\det(A) = 1$
- **Rationale:** By definition, a square matrix is symmetric if it is equal to its own transpose, meaning the element $a_{ij}$ is equal to $a_{ji}$ for all $i$ and $j$.

**m-54. Evaluate the integral of $\sin(x) dx$ from 0 to $\pi$.**
- A) 0
- B) 1
- **C) 2**
- D) -2
- **Rationale:** The antiderivative of $\sin(x)$ is $-\cos(x)$. Evaluating the definite integral: $[-\cos(\pi)] - [-\cos(0)] = [-(-1)] - [-1] = 1 + 1 = 2$.


**m-55. In the complex plane, multiplying a number by $i$ results in a rotation of:**
- A) $45^\circ$ counter-clockwise
- **B) $90^\circ$ counter-clockwise**
- C) $180^\circ$ counter-clockwise
- D) $90^\circ$ clockwise
- **Rationale:** Multiplying by $i$ (which is $e^{i\pi/2}$ in polar form) adds $\pi/2$ radians ($90^\circ$) to the argument of the complex number, resulting in a counter-clockwise rotation.


**m-56. If the determinant of a $2 \times 2$ matrix $A$ is 5, what is the determinant of its inverse $A^{-1}$?**
- A) 5
- B) -5
- **C) 1/5**
- D) 0
- **Rationale:** One of the fundamental properties of determinants is that $\det(A^{-1}) = \frac{1}{\det(A)}$. Thus, $\det(A^{-1}) = 1/5$.

**m-57. What is the slope of a line perpendicular to the line $y = 3x + 5$?**
- A) 3
- B) -3
- C) 1/3
- **D) -1/3**
- **Rationale:** The slopes of two perpendicular lines ($m_1$ and $m_2$) satisfy the relationship $m_1 \cdot m_2 = -1$. Since $m_1 = 3$, then $m_2 = -1/3$.

**m-58. Evaluate the limit as $x$ approaches 0 of $\frac{1 - \cos(x)}{x^2}$.**
- A) 0
- B) 1
- **C) 1/2**
- D) Infinity
- **Rationale:** This can be solved using L'Hôpital's Rule twice or by using the Taylor expansion: $\cos(x) \approx 1 - \frac{x^2}{2}$. Substituting this gives $\frac{1 - (1 - x^2/2)}{x^2} = \frac{x^2/2}{x^2} = 1/2$.

**m-59. In a standard normal distribution, what is the mean?**
- A) 1
- **B) 0**
- C) 0.5
- D) Depends on variance
- **Rationale:** A standard normal distribution is specifically defined as a normal distribution with a mean ($\mu$) of 0 and a standard deviation ($\sigma$) of 1.

**m-60. What is the derivative of $f(x) = x \cdot \ln(x)$?**
- A) $1/x$
- B) $\ln(x)$
- **C) $\ln(x) + 1$**
- D) 1
- **Rationale:** Using the product rule $(uv)' = u'v + uv'$: $\frac{d}{dx}(x) \cdot \ln(x) + x \cdot \frac{d}{dx}(\ln(x)) = 1 \cdot \ln(x) + x \cdot (1/x) = \ln(x) + 1$.

**m-61. If $P(A) = 0.4$ and $P(B) = 0.5$ are independent events, what is $P(A \cap B)$?**
- A) 0.9
- B) 0.1
- **C) 0.2**
- D) 0.25
- **Rationale:** For independent events, the probability of both occurring is the product of their individual probabilities: $P(A \cap B) = P(A) \cdot P(B) = 0.4 \cdot 0.5 = 0.2$.

**m-62. Calculate the volume of a cylinder with radius $r=2$ and height $h=5$.**
- A) $10\pi$
- **B) $20\pi$**
- C) $15\pi$
- D) $4\pi$
- **Rationale:** The volume of a cylinder is $V = \pi r^2 h$. Substituting the given values: $V = \pi(2^2)(5) = 20\pi$.


**m-63. What is the integral of $\tan(x) dx$?**
- A) $\sec^2(x) + C$
- B) $\ln|\sec(x)| + C$
- C) $-\ln|\cos(x)| + C$
- **D) B and C are correct**
- **Rationale:** $\int \tan(x) dx = -\ln|\cos(x)| + C$. Using the property of logarithms $- \ln(y) = \ln(1/y)$, this is equivalent to $\ln|1/\cos(x)| + C = \ln|\sec(x)| + C$.

**m-64. A vector $\mathbf{v}$ has components (3, 4). What angle does it make with the positive x-axis?**
- A) $30^\circ$
- B) $45^\circ$
- **C) $53.1^\circ$**
- D) $60^\circ$
- **Rationale:** The angle $\theta$ is calculated as $\arctan(y/x) = \arctan(4/3)$. This results in approximately $53.13^\circ$.

**m-65. What does the derivative of a function at a point represent geometrically?**
- A) Area under the curve
- **B) Slope of the tangent line**
- C) Length of the curve
- D) Average of the function
- **Rationale:** Geometrically, the value of the derivative at a specific point is the slope of the line that is tangent to the function's graph at that point.


**m-66. Solve for $x$: $e^{2x} = 5$.**
- **A) $\ln(5)/2$**
- B) $\ln(2.5)$
- C) $2 \ln(5)$
- D) $\sqrt{5}$
- **Rationale:** Apply the natural logarithm to both sides to get $2x = \ln(5)$. Solving for $x$ gives $x = \ln(5)/2$.

**m-67. The sum of the interior angles of a hexagon is:**
- A) $360^\circ$
- B) $540^\circ$
- **C) $720^\circ$**
- D) $900^\circ$
- **Rationale:** The sum of interior angles is $(n-2) \times 180^\circ$. For a hexagon ($n=6$): $(6-2) \times 180^\circ = 4 \times 180^\circ = 720^\circ$.


**m-68. If matrix $A$ is $2 \times 3$ and matrix $B$ is $3 \times 4$, what is the dimension of matrix $AB$?**
- A) $2 \times 3$
- B) $3 \times 4$
- **C) $2 \times 4$**
- D) Undefined
- **Rationale:** To multiply matrices, the number of columns in the first must match the rows in the second. The resulting matrix takes the rows of the first and the columns of the second ($2 \times 4$).

**m-69. Evaluate the integral of $\frac{2x}{x^2 + 1} dx$.**
- **A) $\ln(x^2 + 1) + C$**
- B) $\arctan(x) + C$
- C) $x^2 + x + C$
- D) $1/(x^2 + 1)$
- **Rationale:** This is in the form $\int \frac{u'}{u} dx$, which results in $\ln|u| + C$. Here $u = x^2+1$ and $u' = 2x$.

**m-70. What is the value of $\cos(\pi)$?**
- A) 0
- B) 1
- **C) -1**
- D) Undefined
- **Rationale:** On the unit circle, $\pi$ radians ($180^\circ$) corresponds to the coordinate $(-1, 0)$. Since cosine is the x-coordinate, $\cos(\pi) = -1$.

**m-71. What is the result of the vector addition $(2, -1, 5) + (-3, 4, 1)$?**
- A) $(5, -5, 4)$
- **B) $(-1, 3, 6)$**
- C) $(-1, 5, 6)$
- D) $(1, -3, -6)$
- **Rationale:** Add the corresponding components: $2 + (-3) = -1$; $-1 + 4 = 3$; $5 + 1 = 6$.

**m-72. The function $f(x) = x^2$ is an example of:**
- A) An odd function
- **B) An even function**
- C) A periodic function
- D) An injective function
- **Rationale:** A function is even if $f(x) = f(-x)$. Since $(x)^2 = (-x)^2$, the function is symmetric across the y-axis.

**m-73. Find the determinant of the matrix $\begin{pmatrix} 1 & 2 \\ 0 & 5 \end{pmatrix}$.**
- A) 0
- B) 2
- **C) 5**
- D) 7
- **Rationale:** For a $2 \times 2$ matrix, the determinant is $ad - bc$. Here, $(1 \cdot 5) - (2 \cdot 0) = 5 - 0 = 5$.

**m-74. Evaluate the integral of $5 dx$ from 2 to 6.**
- **A) 20**
- B) 30
- C) 4
- D) 5
- **Rationale:** The antiderivative is $5x$. Evaluating from 2 to 6: $5(6) - 5(2) = 30 - 10 = 20$.

**m-75. If $\log_{10}(x) = 2$, then $x$ is:**
- A) 2
- B) 10
- C) 20
- **D) 100**
- **Rationale:** The logarithmic equation $\log_b(x) = y$ is equivalent to $b^y = x$. Thus, $10^2 = 100$.

<div style="page-break-after: always;"></div>



# 🚀 Physics I: Mechanics & Optics

**p-01. A constant force of 20N acts on a 5kg mass for 4 seconds. What is the change in velocity?**
- A) 4 m/s
- B) 10 m/s
- **C) 16 m/s**
- D) 8 m/s
- **Rationale:** According to Newton's Second Law, $a = F/m = 20/5 = 4$ m/s². The change in velocity is $\Delta v = a \cdot t = 4 \cdot 4 = 16$ m/s.

**p-02. A 2kg object is dropped from a height of 10m. What is its kinetic energy just before hitting the ground? (Use $g = 9.8$ m/s²)**
- A) 98 J
- **B) 196 J**
- C) 20 J
- D) 49 J
- **Rationale:** By conservation of energy, all potential energy ($mgh$) converts to kinetic energy ($K$). $K = 2 \cdot 9.8 \cdot 10 = 196$ J.


**p-03. Two $10\Omega$ resistors are connected in parallel. This combination is connected in series with a $5\Omega$ resistor. Total resistance is:**
- A) $25\Omega$
- B) $15\Omega$
- **C) $10\Omega$**
- D) $7.5\Omega$
- **Rationale:** Parallel part is $R_p = \frac{10 \cdot 10}{10 + 10} = 5\Omega$. Total resistance is $R_p + R_{series} = 5 + 5 = 10\Omega$.


**p-04. If the absolute temperature of an ideal gas doubles while volume remains constant, the pressure:**
- A) Stays the same
- **B) Doubles**
- C) Is halved
- D) Quadruples
- **Rationale:** According to Gay-Lussac's law, pressure is proportional to absolute temperature ($P \propto T$) when volume is constant.

**p-05. A wave has a frequency of 50Hz and a wavelength of 2m. What is its speed?**
- A) 25 m/s
- **B) 100 m/s**
- C) 0.04 m/s
- D) 50 m/s
- **Rationale:** Wave speed is calculated as $v = f \cdot \lambda = 50 \cdot 2 = 100$ m/s.


**p-06. An elevator accelerates upwards at 2 m/s². A 70kg person stands on a scale inside. What does it read? (Use $g = 9.8$ m/s²)**
- A) 686 N
- B) 140 N
- **C) 826 N**
- D) 546 N
- **Rationale:** Apparent weight (Normal force) is $F_n = m(g + a) = 70(9.8 + 2) = 826$ N.


**p-07. Which Newton's law explains why a passenger lurches forward when a car stops suddenly?**
- **A) First Law (Inertia)**
- B) Second Law ($F=ma$)
- C) Third Law (Action/Reaction)
- D) Law of Gravitation
- **Rationale:** Newton's First Law states that an object in motion stays in motion unless acted upon by an external force.

**p-08. The work done by a force of 50N pulling an object 10m at an angle of $60^\circ$ to the horizontal is:**
- A) 500 J
- B) 433 J
- **C) 250 J**
- D) 0 J
- **Rationale:** Work is $W = F \cdot d \cdot \cos(\theta) = 50 \cdot 10 \cdot \cos(60^\circ) = 250$ J.

**p-09. What is the hydrostatic pressure at a depth of 10m in water? ($\rho=1000$ kg/m³, $g=10$ m/s²)**
- A) 10,000 Pa
- **B) 100,000 Pa**
- C) 1,000 Pa
- D) 50,000 Pa
- **Rationale:** Pressure at depth is $P = \rho gh = 1000 \cdot 10 \cdot 10 = 100,000$ Pa.

**p-10. A car moves at 20m/s around a curve of radius 100m. Centripetal acceleration is:**
- A) 2 m/s²
- **B) 4 m/s²**
- C) 0.2 m/s²
- D) 20 m/s²
- **Rationale:** Centripetal acceleration is $a_c = v^2/r = 20^2 / 100 = 4$ m/s².


**p-11. The focal length of a converging lens is 20cm. If an object is at 40cm, the image is:**
- A) Virtual and upright
- **B) Real and same size**
- C) Real and magnified
- D) At infinity
- **Rationale:** When the object is at $2f$ (twice the focal length), the image is real, inverted, and the same size.


**p-12. The specific heat of water is 4184 J/kg·C. Energy needed to heat 1kg of water by $2^\circ$C is:**
- A) 2092 J
- B) 4184 J
- **C) 8368 J**
- D) 1000 J
- **Rationale:** Heat energy $Q = mc\Delta T = 1 \cdot 4184 \cdot 2 = 8368$ J.

**p-13. According to Ohm's Law, if voltage is doubled and resistance is halved, current:**
- A) Doubles
- B) Stays same
- **C) Quadruples**
- D) Halves
- **Rationale:** From $I = V/R$: New $I = \frac{2V}{0.5R} = 4\left(\frac{V}{R}\right)$.

**p-14. Which property of a sound wave determines its pitch?**
- A) Amplitude
- B) Speed
- **C) Frequency**
- D) Intensity
- **Rationale:** Pitch is the human auditory perception of the frequency of a sound wave.

**p-15. A hydraulic lift has pistons of areas 0.01m² and 0.1m². A 100N force on the small one lifts:**
- A) 100 N
- **B) 1000 N**
- C) 10 N
- D) 500 N
- **Rationale:** Pascal's Principle: $\frac{F_1}{A_1} = \frac{F_2}{A_2}$. Thus $F_2 = 100 \cdot \frac{0.1}{0.01} = 1000$ N.


**p-16. The escape velocity from Earth depends on:**
- A) Mass of projectile
- B) Mass of Earth
- C) Radius of Earth
- **D) Both B and C**
- **Rationale:** Escape velocity $v_e = \sqrt{\frac{2GM}{R}}$ depends on the mass and radius of the planet, not the object's mass.

**p-17. What is the momentum of a 0.5kg ball moving at 20m/s?**
- **A) 10 kg·m/s**
- B) 40 kg·m/s
- C) 5 kg·m/s
- D) 20 kg·m/s
- **Rationale:** Momentum $p = mv = 0.5 \cdot 20 = 10$ kg·m/s.

**p-18. In a perfectly inelastic collision, which is conserved?**
- A) Kinetic Energy
- **B) Momentum**
- C) Both
- D) Neither
- **Rationale:** Momentum is always conserved in isolated systems, but kinetic energy is lost in inelastic collisions.

**p-19. The primary charge carriers in a P-type semiconductor are:**
- A) Electrons
- B) Neutrons
- **C) Holes**
- D) Protons
- **Rationale:** P-type semiconductors are doped to create an excess of holes as majority carriers.


**p-20. A transformer has 100 turns in primary and 500 in secondary. If primary voltage is 20V, secondary is:**
- A) 4 V
- **B) 100 V**
- C) 50 V
- D) 10 V
- **Rationale:** Voltage ratio equals turns ratio: $\frac{V_s}{V_p} = \frac{N_s}{N_p} \implies V_s = 20 \cdot \frac{500}{100} = 100$ V.


**p-21. The torque produced by a 10N force perpendicular to a 0.5m wrench is:**
- A) 20 Nm
- **B) 5 Nm**
- C) 10 Nm
- D) 2 Nm
- **Rationale:** Torque $\tau = F \cdot r \cdot \sin(90^\circ) = 10 \cdot 0.5 = 5$ Nm.

**p-22. Which type of radiation has the highest penetrating power?**
- A) Alpha
- B) Beta
- **C) Gamma**
- D) Visible light
- **Rationale:** Gamma rays are high-energy electromagnetic radiation with much higher penetration depth than alpha or beta particles.

**p-23. The displacement of an object in SHM is $x = A \cos(\omega t)$. Maximum acceleration is:**
- A) $A\omega$
- **B) $A\omega^2$**
- C) $\omega^2$
- D) $A^2\omega$
- **Rationale:** Acceleration is the second derivative of displacement: $a = -A\omega^2 \cos(\omega t)$. The maximum magnitude is $A\omega^2$.

**p-24. A convex mirror always forms an image that is:**
- A) Real and inverted
- B) Virtual and magnified
- **C) Virtual and diminished**
- D) Real and diminished
- **Rationale:** Convex mirrors diverge light rays, always forming a virtual, upright, and smaller image.


**p-25. The SI unit of magnetic flux is:**
- A) Tesla
- **B) Weber**
- C) Henry
- D) Gauss
- **Rationale:** The Weber (Wb) is the standard SI unit for magnetic flux.
<div style="page-break-after: always;"></div>

# 🚀 Physics II: Thermodynamics & Electromagnetism

**p-26. Bernoulli's Principle**
According to Bernoulli's equation for incompressible flow, if the velocity $v$ of the fluid increases, the pressure $P$ must:
- A) Increase
- **B) Decrease**
- C) Remain constant
- D) Become zero
- **Rationale:** From $P + \frac{1}{2}\rho v^2 = \text{constant}$, an increase in kinetic energy ($\frac{1}{2}\rho v^2$) requires a decrease in pressure energy ($P$).


**p-27. What is the buoyant force on a $2\text{ m}^3$ object fully submerged in water ($\rho = 1000\text{ kg/m}^3$)?**
- A) 2000 N
- B) 9800 N
- **C) 19600 N**
- D) 4900 N
- **Rationale:** Archimedes' Principle: $F_b = \rho_{fluid} \cdot V_{displaced} \cdot g = 1000 \cdot 2 \cdot 9.8 = 19600\text{ N}$.


**p-28. A gas is compressed at a constant temperature. This process is called:**
- A) Adiabatic
- B) Isobaric
- **C) Isothermal**
- D) Isochoric
- **Rationale:** "Iso" means constant, and "thermal" refers to temperature.

**p-29. The speed of sound in dry air at $20^\circ\text{C}$ is approximately:**
- A) 300 m/s
- **B) 343 m/s**
- C) 1500 m/s
- D) 299,792,458 m/s
- **Rationale:** The speed of sound in air depends on temperature, being approx. $331 + 0.6T$.

**p-30. Which law of thermodynamics states that entropy of an isolated system always increases?**
- A) First Law
- **B) Second Law**
- C) Third Law
- D) Zeroth Law
- **Rationale:** The Second Law introduces entropy as a measure of disorder that increases over time.

**p-31. Calculate the heat required to raise the temperature of 2kg of water by $10^\circ\text{C}$ ($c = 4186\text{ J/kg}^\circ\text{C}$).**
- A) 8372 J
- **B) 83720 J**
- C) 41860 J
- D) 20930 J
- **Rationale:** $Q = mc\Delta T = 2 \cdot 4186 \cdot 10 = 83720\text{ J}$.

**p-32. Coulombs Law: The force between two $1\text{C}$ charges separated by 1m is:**
- A) 1 N
- B) $1.6 \times 10^{-19}\text{ N}$
- **C) $8.99 \times 10^9\text{ N}$**
- D) $9.8\text{ N}$
- **Rationale:** $F = k \frac{q_1q_2}{r^2}$. Since $k \approx 9 \times 10^9$, $F = 9 \times 10^9 \cdot \frac{1 \cdot 1}{1^2}$.


**p-33. An ideal gas occupies 22.4L at STP. If the pressure is doubled and temperature is constant, the volume becomes:**
- **A) 11.2 L**
- B) 44.8 L
- C) 22.4 L
- D) 5.6 L
- **Rationale:** Boyle's Law: $P_1V_1 = P_2V_2$. If $P$ doubles, $V$ must halve.

**p-34. The electric field $E$ at a distance $r$ from a point charge $Q$ is proportional to:**
- A) $r$
- B) $1/r$
- **C) $1/r^2$**
- D) $r^2$
- **Rationale:** $E = k \frac{Q}{r^2}$, following the inverse-square law.

**p-35. What is the change in internal energy if 500J of heat is added to a system and the system does 200J of work?**
- A) 700 J
- **B) 300 J**
- C) -300 J
- D) 500 J
- **Rationale:** $\Delta U = Q - W = 500 - 200 = 300\text{ J}$.

**p-36. A wire has a resistance of $10\Omega$. If its length is doubled and area is halved, the new resistance is:**
- A) $10\Omega$
- B) $20\Omega$
- **C) $40\Omega$**
- D) $5\Omega$
- **Rationale:** $R = \rho \frac{L}{A}$. New $R = \rho \frac{2L}{A/2} = 4 \rho \frac{L}{A} = 4 \cdot 10 = 40\Omega$.

**p-37. The electric potential $V$ is measured in:**
- A) Amperes
- B) Ohms
- **C) Volts**
- D) Watts
- **Rationale:** Potential difference or voltage is measured in Volts (Joules per Coulomb).

**p-38. Which particle is the primary carrier of electric current in a copper wire?**
- A) Protons
- **B) Electrons**
- C) Neutrons
- D) Photons
- **Rationale:** In metals, valence electrons are free to move and carry charge.

**p-39. A $10\text{V}$ battery is connected to a $5\Omega$ resistor. The current is:**
- **A) 2 A**
- B) 0.5 A
- C) 50 A
- D) 15 A
- **Rationale:** Ohm's Law: $I = V/R = 10/5 = 2\text{ A}$.

**p-40. The magnetic field at the center of a circular current loop depends on:**
- A) Only the current
- B) Only the radius
- **C) Both current and radius**
- D) Neither
- **Rationale:** $B = \frac{\mu_0 I}{2R}$.


**p-41. An object is floating in a fluid. This implies:**
- A) $F_b < \text{Weight}$
- **B) $F_b = \text{Weight}$**
- C) $\rho_{object} > \rho_{fluid}$
- D) The object has no mass
- **Rationale:** For static equilibrium in flotation, the upward buoyant force must balance the downward weight.

**p-42. The "Triple Point" of water occurs at:**
- **A) 0.01°C and 0.006 atm**
- B) 100°C and 1 atm
- C) 0°C and 1 atm
- D) 373 K and 0 atm
- **Rationale:** It is the unique temperature and pressure where all three phases (solid, liquid, gas) coexist.


**p-43. A step-up transformer increases:**
- A) Power
- **B) Voltage**
- C) Current
- D) Frequency
- **Rationale:** It "steps up" voltage while decreasing current to conserve power ($P=VI$).

**p-44. Magnetic flux $\Phi_B$ is measured in:**
- A) Tesla
- **B) Weber**
- C) Henry
- D) Faraday
- **Rationale:** Weber (Wb) is the unit for flux; Tesla (T) is for magnetic field strength.

**p-45. If the temperature of an ideal gas is doubled (in Kelvin), the average kinetic energy of its molecules:**
- A) Remains the same
- **B) Doubles**
- C) Quadruples
- D) Is halved
- **Rationale:** $KE_{avg} = \frac{3}{2}kT$. Kinetic energy is directly proportional to absolute temperature.

**p-46. The capacitance of a parallel plate capacitor increases if:**
- **A) Plate area increases**
- B) Distance between plates increases
- C) Dielectric is removed
- D) Voltage decreases
- **Rationale:** $C = \epsilon \frac{A}{d}$. Increasing $A$ increases $C$.


**p-47. Snell's Law relates:**
- A) Force and acceleration
- **B) Angles of incidence and refraction**
- C) Pressure and volume
- D) Current and voltage
- **Rationale:** $n_1 \sin(\theta_1) = n_2 \sin(\theta_2)$.


**p-48. A wave has a frequency of 500Hz and wavelength of 2m. Its speed is:**
- A) 250 m/s
- **B) 1000 m/s**
- C) 0.004 m/s
- D) 502 m/s
- **Rationale:** $v = f \cdot \lambda = 500 \cdot 2 = 1000\text{ m/s}$.

**p-49. The heat of fusion is the energy required to:**
- A) Raise temperature by 1°C
- **B) Change solid to liquid**
- C) Change liquid to gas
- D) Burn a substance
- **Rationale:** It is the latent heat involved in the phase change from solid to liquid.

**p-50. Kirchhoff's Junction Rule is a consequence of the conservation of:**
- A) Energy
- **B) Charge**
- C) Momentum
- D) Mass
- **Rationale:** The total current entering a junction must equal the total current leaving it (charge conservation).


<div style="page-break-after: always;"></div>

# 🚀 Physics III: Modern Physics

**p-51. Photoelectric Effect: Threshold Frequency**
The minimum frequency of light required to eject electrons from a metal surface is called:
- A) Operating frequency
- **B) Threshold frequency**
- C) Resonance frequency
- D) Cut-off wavelength
- **Rationale:** If the incident photon energy $hf$ is less than the work function $\Phi$, no electrons are emitted, regardless of intensity.

**p-52. Bohr Model: Energy Levels**
In the Bohr model of the atom, the energy of an electron in a specific orbit is:
- A) Continuous
- **B) Quantized**
- C) Zero
- D) Infinite
- **Rationale:** Electrons can only occupy specific, discrete energy levels (orbits).

**p-53. Radioactive Decay Law**
The law $N = N_0 e^{-\lambda t}$ describes how the number of nuclei decreases over time. What does $\lambda$ represent?
- A) Half-life
- B) Mean life
- **C) Decay constant**
- D) Activity
- **Rationale:** $\lambda$ is the probability per unit time that a nucleus will decay.

**p-54. Nuclear Physics: Mass Defect**
The difference between the mass of a nucleus and the sum of the masses of its individual nucleons is known as:
- A) Atomic mass
- B) Mass number
- **C) Mass defect**
- D) Isotope effect
- **Rationale:** This "missing" mass is converted into binding energy according to $E=mc^2$.

**p-55. Special Relativity: Time Dilation**
As the velocity of an object approaches the speed of light, time for that object, as observed by a stationary observer, appears to:
- A) Speed up
- **B) Slow down**
- C) Remain the same
- D) Stop completely
- **Rationale:** According to the Lorentz transformation, $t' = t \cdot \gamma$, meaning time dilates (expands) for moving objects.

**p-56. What is the energy of a photon with wavelength $\lambda$?**
- **A) $hc/\lambda$**
- B) $h\lambda/c$
- C) $hf^2$
- D) $1/2 m v^2$
- **Rationale:** Since $E = hf$ and $f = c/\lambda$, substituting gives $E = hc/\lambda$.

**p-57. De Broglie Wavelength**
The wavelength associated with a moving particle of mass $m$ and velocity $v$ is:
- A) $\lambda = mv/h$
- **B) $\lambda = h/mv$**
- C) $\lambda = hmv$
- D) $\lambda = c/v$
- **Rationale:** Matter-wave duality states that all matter has wave properties with wavelength $\lambda = h/p$.

**p-58. Semiconductor Physics: n-type Doping**
To create an n-type semiconductor, silicon (Group 14) is typically doped with:
- A) Boron (Group 13)
- **B) Phosphorus (Group 15)**
- C) Carbon (Group 14)
- D) Aluminum (Group 13)
- **Rationale:** Group 15 elements have an extra valence electron to donate as a charge carrier.

**p-59. P-N Junction: Depletion Region**
The region at the interface of a p-type and n-type semiconductor that is void of free charge carriers is called:
- A) Conduction band
- **B) Depletion region**
- C) Valence band
- D) Junction barrier
- **Rationale:** Diffusion of electrons and holes across the junction creates a neutral zone with an electric field.

**p-60. Nuclear Fusion**
Which process powers the sun by combining light nuclei into heavier ones?
- **A) Fusion**
- B) Fission
- C) Alpha decay
- D) Beta decay
- **Rationale:** In the sun, hydrogen nuclei fuse to form helium, releasing vast amounts of energy.

**p-61. Heisenberg Uncertainty Principle**
This principle states that it is impossible to simultaneously know exactly both the:
- A) Mass and velocity
- **B) Position and momentum**
- C) Energy and mass
- D) Time and space
- **Rationale:** $\Delta x \cdot \Delta p \geq h/4\pi$.

**p-62. An alpha particle consists of:**
- A) Two electrons
- **B) Two protons and two neutrons**
- C) One proton and one electron
- D) A high-energy photon
- **Rationale:** An alpha particle is essentially a Helium-4 nucleus ($He^{2+}$).

**p-63. The process where a heavy nucleus splits into two smaller nuclei is:**
- A) Fusion
- **B) Fission**
- C) Ionization
- D) Excitation
- **Rationale:** Nuclear fission is used in current nuclear power plants.

**p-64. Logic Gates: AND Gate**
In an AND gate, the output is 1 (high) only if:
- A) Either input is 1
- **B) Both inputs are 1**
- C) Both inputs are 0
- D) One input is 1 and the other is 0
- **Rationale:** Boolean operation $Y = A \cdot B$.


**p-65. A light ray enters glass ($n=1.5$) from air ($n=1.0$). The ray will bend:**
- **A) Toward the normal**
- B) Away from the normal
- C) Not at all
- D) Back into the air
- **Rationale:** When moving to a denser medium (higher $n$), the light slows down and bends toward the normal.

**p-66. What is the work function $\Phi$ of a metal if the threshold frequency is $10^{15}\text{ Hz}$? ($h \approx 6.6 \times 10^{-34}\text{ J}\cdot\text{s}$)**
- **A) $6.6 \times 10^{-19}\text{ J}$**
- B) $6.6 \times 10^{-34}\text{ J}$
- C) $3 \times 10^8\text{ J}$
- D) $1.6 \times 10^{-19}\text{ J}$
- **Rationale:** $\Phi = h f_0 = 6.6 \times 10^{-34} \cdot 10^{15} = 6.6 \times 10^{-19}\text{ J}$.

**p-67. In a p-type semiconductor, the majority charge carriers are:**
- A) Electrons
- **B) Holes**
- C) Neutrons
- D) Protons
- **Rationale:** Doping with trivalent atoms creates "holes" in the crystal lattice.

**p-68. The energy required to remove an electron from an atom is called:**
- **A) Ionization energy**
- B) Binding energy
- C) Potential energy
- D) Kinetic energy
- **Rationale:** This is the energy needed to take an electron from its ground state to infinity.

**p-69. Beta minus ($\beta^-$) decay involves the emission of:**
- **A) An electron**
- B) A positron
- C) An alpha particle
- D) A neutron
- **Rationale:** A neutron converts into a proton, emitting an electron and an antineutrino.

**p-70. The wavelength of the peak emission from a blackbody is inversely proportional to its:**
- A) Surface area
- **B) Absolute temperature**
- C) Mass
- D) Volume
- **Rationale:** Wien's Displacement Law: $\lambda_{max} \cdot T = \text{constant}$.

**p-71. A photon of blue light has more energy than a photon of red light because it has:**
- **A) Higher frequency**
- B) Longer wavelength
- C) Greater speed
- D) Larger mass
- **Rationale:** $E=hf$. Blue light has a higher frequency than red light.

**p-72. Total Internal Reflection occurs when light moves from:**
- **A) Denser to rarer medium at an angle greater than critical angle**
- B) Rarer to denser medium
- C) Denser to rarer medium at an angle less than critical angle
- D) Any medium at $90^\circ$
- **Rationale:** Light must speed up and be at a steep enough angle to be reflected back.

**p-73. The mass of an object moving at relativistic speeds appears to:**
- **A) Increase**
- B) Decrease
- C) Stay the same
- D) Become zero
- **Rationale:** Relativistic mass $m = \gamma m_0$.

**p-74. Half-life is the time for:**
- **A) Half the nuclei in a sample to decay**
- B) All the nuclei to decay
- C) The mass of the sample to double
- D) The temperature to halve
- **Rationale:** Standard definition of $T_{1/2}$.

**p-75. The exclusion principle stating that no two electrons can have the same four quantum numbers is:**
- **A) Pauli Exclusion Principle**
- B) Aufbau Principle
- C) Hund's Rule
- D) Dalton's Law
- **Rationale:** This explains the shell structure of atoms.

<div style="page-break-after: always;"></div>

# ✈️ Aero Engineering I: Flight Loads

**ae-1. In the V-n diagram, what does the 'Limit Load Factor' represent?**
* A) The load at which the structure breaks
* **B) The maximum load the aircraft is expected to encounter in service**
* C) The load during a normal landing
* D) The load at zero airspeed
* **Rationale:** According to Chapter 5 (AE1102), the Limit Load is the maximum load expected in flight. The structure must be able to support this load without permanent deformation.

**ae-2. What is the typical 'Factor of Safety' used in aerospace structural design for the Ultimate Load?**
* A) 1.0
* **B) 1.5**
* C) 2.5
* D) 5.0
* **Rationale:** The Ultimate Load is defined as the Limit Load multiplied by a Factor of Safety, which is traditionally $1.5$ in aerospace engineering.

**ae-3. Which structural member of the wing is primarily designed to resist bending moments?**
* A) Ribs
* B) Skin
* **C) Spars**
* D) Stringers
* **Rationale:** Spars are the main longitudinal beams of the wing. Their primary function is to carry the bending loads generated by lift.


**ae-4. The point on the V-n diagram where the maximum lift line intersects the limit load factor is known as:**
* **A) Maneuver Speed ($V_a$)**
* B) Cruising Speed ($V_c$)
* C) Never Exceed Speed ($V_{ne}$)
* D) Stall Speed ($V_s$)
* **Rationale:** $V_a$ (Maneuver Speed) is the maximum speed at which full control deflection can be used without overstressing the structure.

**ae-5. Which type of stress is characterized by forces acting to 'stretch' a structural component?**
* A) Compression
* B) Torsion
* **C) Tension**
* D) Shear
* **Rationale:** Tension occurs when a member is subjected to pulling forces. In a wing, the lower skin is typically under tension during level flight.

**ae-6. In a semi-monocoque fuselage, what is the primary purpose of the 'Stringers'?**
* A) To provide aerodynamic shape only
* **B) To carry axial loads and prevent skin buckling**
* C) To hold the fuel
* D) To connect the wings
* **Rationale:** Stringers are longitudinal members that stiffen the skin and carry axial loads, preventing the thin skin from buckling under compression.

**ae-7. What happens to a material when it exceeds its 'Yield Point'?**
* A) It returns to its original shape
* **B) It suffers permanent (plastic) deformation**
* C) It immediately shatters
* D) Its temperature drops
* **Rationale:** Beyond the yield point, the material enters the plastic region. Removing the load will no longer return the component to its original dimensions.

**ae-8. Hooke's Law states that within the elastic limit, Stress ($\sigma$) is directly proportional to:**
* **A) Strain ($\epsilon$)**
* B) Weight
* C) Velocity
* D) Temperature
* **Rationale:** The relationship $\sigma = E\epsilon$ defines Hooke's Law, where $E$ is Young's Modulus, representing the stiffness of the material.

**ae-9. Which of these materials is known for having a high 'Specific Strength' (strength-to-weight ratio)?**
* A) Cast Iron
* **B) Carbon Fiber Reinforced Polymer (CFRP)**
* C) Lead
* D) Pure Copper
* **Rationale:** Composites like CFRP are critical in modern aerospace because they offer immense strength with very low density compared to metals.

**ae-10. What structural component is responsible for maintaining the aerodynamic shape of the wing profile?**
* A) Spars
* **B) Ribs**
* C) Longerons
* D) Bulkheads
* **Rationale:** Ribs are transverse elements that give the wing its airfoil shape and transfer loads from the skin to the spars.

**ae-11. In a wing undergoing upward bending, which part is under 'Compression'?**
* A) The lower skin
* **B) The upper skin**
* C) The trailing edge only
* D) The wing tip
* **Rationale:** During upward bending, the upper part of the wing structure is squeezed (compression) while the lower part is stretched (tension).

**ae-12. The 'Modulus of Elasticity' ($E$) is a measure of a material's:**
* A) Ductility
* **B) Stiffness**
* C) Weight
* D) Hardness
* **Rationale:** Young's Modulus ($E$) indicates how much a material resists deformation. A higher $E$ means a stiffer material.

**ae-13. Which axis of the aircraft is primarily affected by 'Torsional' loads on the wing?**
* A) Longitudinal axis
* B) Lateral axis
* **C) The wing's own longitudinal axis (twisting)**
* D) Vertical axis
* **Rationale:** Torsion refers to twisting moments. Wings must be stiff enough to resist twisting, which could change the angle of attack locally.

**ae-14. What is the primary advantage of 'Sandwich Structures' in aerospace?**
* A) Low cost
* **B) High flexural stiffness with very low weight**
* C) High heat resistance
* D) Ease of transparency
* **Rationale:** By separating two thin skins with a lightweight core (like honeycomb), a structure with very high bending stiffness is achieved for minimum weight.

**ae-15. What is 'Fatigue' in an aerospace context?**
* A) Corrosion over time
* **B) The weakening of a material due to repeated cyclic loading**
* C) The melting of the skin due to friction
* D) Pilot exhaustion
* **Rationale:** Fatigue is critical because aircraft undergo repeated pressurization and gust cycles that can lead to crack growth even at low loads.

**ae-16. Which type of fuselage construction uses the skin as the primary load-bearing member?**
* A) Truss type
* **B) Monocoque**
* C) Geodesic
* D) Space frame
* **Rationale:** In monocoque construction, the skin carries all or most of the stresses, similar to an aluminum can.

**ae-17. The 'Safe-Life' design philosophy means a component is designed to:**
* A) Fail safely without warning
* **B) Be replaced before there is any risk of fatigue failure**
* C) Be used until it breaks
* D) Never require inspection
* **Rationale:** Safe-life components are retired after a specific number of hours, well before the probability of a fatigue crack becomes significant.

**ae-18. What is the primary function of 'Bulkheads' in a fuselage?**
* A) To store luggage
* **B) To provide shape and resist pressure loads in the cabin**
* C) To connect the propeller
* D) To reduce skin friction
* **Rationale:** Bulkheads are major transverse members that maintain the fuselage shape and act as pressure seals at the ends of the cabin.

**ae-19. Which material property describes the ability to undergo significant plastic deformation before rupture?**
* A) Brittleness
* **B) Ductility**
* C) Elasticity
* D) Density
* **Rationale:** Ductile materials (like Aluminum) will stretch significantly before breaking, providing a visual warning of failure.

**ae-20. In the V-n diagram, the 'Gust Envelope' accounts for:**
* A) Changes in weight
* **B) Sudden vertical air disturbances**
* C) Maximum engine thrust
* D) Landing gear extension
* **Rationale:** Atmospheric gusts increase the effective angle of attack, creating sudden peaks in the load factor ($n$) that the structure must withstand.

**ae-21. Which of the following is a 'Primary Structure' component?**
* A) Galley equipment
* **B) Wing spar**
* C) Passenger seats
* D) Cabin carpet
* **Rationale:** Primary structures are those whose failure would result in the loss of the aircraft. The wing spar is a textbook example.

**ae-22. What does 'Anisotropy' mean in the context of composite materials?**
* A) The material has the same properties in all directions
* **B) The material properties vary depending on the direction of the fibers**
* C) The material is magnetic
* D) The material is transparent
* **Rationale:** Unlike isotropic metals, composites are anisotropic; they are much stronger in the direction of the fibers.

**ae-23. The 'Fail-Safe' design philosophy ensures that:**
* A) The aircraft will never have a crack
* **B) If one component fails, other members can carry the load**
* C) The pilot is always safe
* D) The engine will never stop
* **Rationale:** Fail-safe structures have redundant load paths, so a single failure does not lead to immediate catastrophic collapse.

**ae-24. What type of load is a 'Shear' load?**
* A) A pulling load
* B) A twisting load
* **C) A load that tends to slide layers of material past each other**
* D) A crushing load
* **Rationale:** Shear stress ($\tau$) occurs when forces are applied parallel to the surface, such as the forces acting on rivets.

**ae-25. In aerospace, what is the 'Stiffness' of a component?**
* A) Its resistance to breaking
* **B) Its resistance to elastic deformation**
* C) Its total weight
* D) Its ability to resist heat
* **Rationale:** Stiffness is about how much a part deflects under load. It is determined by both the material's Modulus ($E$) and the geometry of the part.

<div style="page-break-after: always;"></div>

# ✈️ Aero Engineering II: Stability & Control 

**ae-26. The "Angle of Attack" (AoA) is defined as the angle between:**
- A) The chord line and the horizon.
- **B) The chord line and the relative wind.**
- C) The wing surface and the fuselage.
- D) The lift vector and the weight vector.
- **Rationale:** AoA is a purely aerodynamic angle. It determines how much the air is "bent" by the wing, which directly influences the lift coefficient.

**ae-27. What is the effect of deploying spoilers during landing?**
- A) Increased lift and decreased drag.
- **B) Decreased lift and increased drag.**
- C) Increased speed.
- D) Decreased stall speed.
- **Rationale:** Spoilers "spoil" the airflow over the upper surface of the wing, destroying lift and significantly increasing form drag to slow the aircraft.

**28. In a turbojet engine, where is the pressure the highest?**
- A) At the intake.
- B) In the turbine.
- **C) At the exit of the compressor (entrance to combustion chamber).**
- D) At the exhaust nozzle.
- **Rationale:** The compressor's sole job is to increase the pressure of the air before it enters the burner to maximize the efficiency of combustion.

**ae-29. The "Center of Gravity" (CG) of an aircraft must typically be located:**
- **A) Forward of the Aerodynamic Center for longitudinal stability.**
- B) Aft of the Aerodynamic Center.
- C) Exactly at the trailing edge.
- D) At the very nose of the aircraft.
- **Rationale:** A forward CG creates a stabilizing nose-down moment that is balanced by the downward force of the tail.

**ae-30. Which of the following describes "Skin Friction Drag"?**
- A) Drag caused by the shape of the object.
- **B) Drag caused by the viscosity of air in the boundary layer.**
- C) Drag caused by shock waves.
- D) Drag caused by wingtip vortices.
- **Rationale:** It is the result of the air "sticking" to the surface of the aircraft due to friction at the microscopic level.

**ae-31. The "V-n Diagram" is used to define:**
- A) Fuel consumption vs speed.
- **B) The structural flight envelope (Load factor vs Velocity).**
- C) Engine thrust at different altitudes.
- D) Passenger capacity vs range.
- **Rationale:** It shows the limits of the aircraft's structural integrity (maneuvering load limits) and its aerodynamic performance (stall limits).



**ae-32. What is the primary function of the "Turbine" in a turbofan engine?**
- A) To produce forward thrust.
- **B) To extract energy from the exhaust to drive the compressor and fan.**
- C) To compress the incoming air.
- D) To mix fuel with air.
- **Rationale:** The turbine acts like a windmill, taking energy from the hot, high-speed gases to turn the shaft that powers the front sections of the engine.

**ae-33. "Dihedral Angle" is the upward angle of the wings from the horizontal. Its purpose is to increase:**
- **A) Lateral stability (roll stability).**
- B) Longitudinal stability.
- C) Directional stability.
- D) Maximum lift.
- **Rationale:** When an aircraft with dihedral slips, the lower wing produces more lift, naturally pushing the aircraft back to a level wings position.

**ae-34. A "Propeller Pitch" that can be adjusted in flight to maintain constant RPM is called:**
- A) Fixed pitch.
- **B) Constant speed (Variable pitch).**
- C) Feathered pitch.
- D) Reverse pitch.
- **Rationale:** It allows the engine to operate at its most efficient RPM regardless of the aircraft's airspeed, similar to a car's gearbox.

**ae-35. "Wave Drag" becomes a significant factor at which speeds?**
- A) Only at very low speeds.
- B) Only in incompressible flow.
- **C) Near and above the speed of sound (Transonic/Supersonic).**
- D) Only in space.
- **Rationale:** Wave drag is caused by the formation of shock waves, which dissipate energy and increase resistance as the aircraft approaches Mach 1.

**ae-36. The "Service Ceiling" is defined as the altitude where the maximum rate of climb drops to:**
- **A) 100 feet per minute.**
- B) 0 feet per minute.
- C) 500 feet per minute.
- D) 1000 feet per minute.
- **Rationale:** While the "absolute ceiling" is where the aircraft cannot climb further (0 fpm), the service ceiling is the practical limit for operations.

**ae-37. What is the "Chord Line" of an airfoil?**
- A) The line of maximum thickness.
- B) The line connecting the center of gravity and the tail.
- **C) The straight line connecting the leading edge and trailing edge.**
- D) The curvature of the upper surface.
- **Rationale:** It is the reference line used to measure angles like the angle of attack and to define the airfoil's geometry.

**ae-38. "Dutch Roll" is often countered by using:**
- A) Larger ailerons.
- **B) A Yaw Damper.**
- C) More thrust.
- D) Leading edge slats.
- **Rationale:** A yaw damper is an automated system that uses the rudder to counter oscillations in the yaw axis before they couple with roll.

**ae-39. In a "Bypass" engine, the bypass ratio is the ratio of:**
- **A) Mass of air passing around the core to mass of air passing through the core.**
- B) Fuel to air in the combustion chamber.
- C) Thrust to weight of the engine.
- D) Intake pressure to exhaust pressure.
- **Rationale:** Modern airliners use high-bypass engines (ratio 8:1 or higher) for better fuel efficiency and lower noise.

**ae-40. Which structural component of the wing primarily carries the bending loads?**
- A) Ribs.
- **B) Spars.**
- C) Stringers.
- D) Skin.
- **Rationale:** Spars are the "main beams" of the wing that run from the root to the tip.

**ae-41. The speed $V_{ne}$ on an airspeed indicator stands for:**
- A) Velocity of Normal Entry.
- **B) Never-Exceed Speed.**
- C) Normal Exit speed.
- D) Velocity of Non-Equilibrium.
- **Rationale:** Exceeding this speed can lead to structural failure or aeroelastic flutter.

**ae-42. "Wing Twist" (Washout) is used to ensure that:**
- **A) The wing root stalls before the wing tip.**
- B) The wing tip stalls before the wing root.
- C) The whole wing stalls at the same time.
- D) The aircraft can fly faster.
- **Rationale:** By having the root stall first, the pilot maintains aileron control (located near the tips) during the beginning of a stall.

**ae-43. The "Static Port" on an aircraft measures:**
- A) Impact pressure of the air.
- **B) Ambient atmospheric pressure.**
- C) Temperature.
- D) Engine oil pressure.
- **Rationale:** It provides the reference pressure for the altimeter, vertical speed indicator, and airspeed indicator.

**ae-44. What is the "Aspect Ratio" of a wing?**
- A) The ratio of thickness to chord.
- **B) The ratio of wingspan to mean chord ($b^2/S$).**
- C) The ratio of lift to drag.
- D) The ratio of weight to thrust.
- **Rationale:** High aspect ratio wings (like gliders) are more efficient because they produce less induced drag.

**ae-45. "Sweepback" on wings is primarily used to:**
- A) Improve low-speed handling.
- **B) Increase the Critical Mach Number.**
- C) Reduce the weight of the wing.
- D) Increase lift at takeoff.
- **Rationale:** It delays the onset of wave drag by making the wing "see" only a component of the actual flight speed.

**ae-46. The "Troposphere" ends at the:**
- A) Mesopause.
- B) Stratopause.
- **C) Tropopause.**
- D) Ionosphere.
- **Rationale:** The tropopause is the boundary where the temperature stops decreasing with altitude.

**ae-47. A "Turbocharger" uses energy from which source to compress intake air?**
- A) The engine crankshaft.
- **B) Engine exhaust gases.**
- C) An electric motor.
- D) The ram air.
- **Rationale:** It uses a turbine driven by exhaust to power a compressor, allowing engines to maintain power at high altitudes.

**ae-48. "Directional Stability" refers to stability around the:**
- A) Longitudinal axis.
- B) Lateral axis.
- **C) Vertical axis (Yaw).**
- D) Earth's axis.
- **Rationale:** It is the tendency of the aircraft to point into the relative wind, primarily provided by the vertical stabilizer.

**ae-49. The "Lift-to-Drag Ratio" ($L/D$) is a measure of an aircraft's:**
- A) Engine power.
- **B) Aerodynamic efficiency.**
- C) Maximum weight capacity.
- D) Structural strength.
- **Rationale:** A higher $L/D$ ratio means the aircraft can fly further for a given amount of fuel or glide further without engine power.

**ae-50. Which instrument uses both the Pitot tube and the Static port?**
- **A) Airspeed Indicator.**
- B) Altimeter.
- C) Vertical Speed Indicator.
- D) Turn Coordinator.
- **Rationale:** It measures the difference between total (dynamic + static) pressure and static pressure to determine speed.

<div style="page-break-after: always;"></div>

# ✈️ Aero Engineering III: Structures 

**ae-51. Which principle explains why a spinning ball curves through the air?**
- A) Archimedes' Principle
- **B) Magnus Effect**
- C) Pascal's Law
- D) Kepler's Law
- **Rationale:** The Magnus effect occurs when a spinning object drags air faster around one side than the other, creating a pressure difference and a sideward force.

**ae-52. The "Mach Cone" angle decreases as the Mach number:**
- **A) Increases**
- B) Decreases
- C) Remains constant
- D) Becomes zero
- **Rationale:** The sine of the Mach angle $\mu$ is given by $\sin(\mu) = 1/M$. Therefore, as $M$ increases, the angle $\mu$ becomes smaller (narrower cone).



**ae-53. In a turbofan, the "Fan Pressure Ratio" is the ratio of:**
- **A) Total pressure leaving the fan to total pressure entering the fan.**
- B) Bypass air to core air.
- C) Static pressure to dynamic pressure.
- D) Fuel flow to thrust.
- **Rationale:** It measures the efficiency of the fan in increasing the energy of the air before it is exhausted or sent to the compressor.

**ae-54. What is the effect of "Anhedral" (downward wing slope)?**
- A) Increased lateral stability.
- **B) Decreased lateral stability (increased maneuverability).**
- C) Increased lift.
- D) Reduced drag.
- **Rationale:** Anhedral is often used on high-wing military aircraft to counteract excessive stability and improve roll response.

**ae-55. The "Specific Fuel Consumption" (SFC) of a jet engine is:**
- **A) Fuel flow rate per unit of thrust.**
- B) Total fuel capacity.
- C) Distance traveled per gallon.
- D) Speed divided by fuel weight.
- **Rationale:** SFC is a critical measure of engine efficiency; lower values mean the engine produces more thrust for less fuel.

**ae-56. "Aileron Reversal" is a high-speed aeroelastic phenomenon caused by:**
- A) Engine failure.
- **B) Wing twisting due to air loads.**
- C) Pilot error.
- D) Low air density.
- **Rationale:** At high speeds, the force from an aileron can twist the entire wing in the opposite direction, reversing the intended roll.

**ae-57. The "Mean Aerodynamic Chord" (MAC) is used to:**
- A) Measure fuel weight.
- **B) Define the longitudinal location of the center of gravity.**
- C) Calculate the engine's bypass ratio.
- D) Determine the landing gear height.
- **Rationale:** CG limits are typically expressed as a percentage of the MAC (% MAC).

**ae-58. What is the primary advantage of a "T-tail" configuration?**
- **A) It keeps the horizontal stabilizer out of the wing's wake and engine exhaust.**
- B) It reduces the weight of the fuselage.
- C) It eliminates the need for a rudder.
- D) It makes the aircraft fly faster.
- **Rationale:** Placing the stabilizer high provides "clean" air for better pitch control, though it is susceptible to deep stalls.

**ae-59. In the context of aircraft structures, "Fatigue" refers to:**
- A) Pilot tiredness.
- **B) Material weakening caused by repeated loading cycles.**
- C) Corrosion of the skin.
- D) Overheating of the engine.
- **Rationale:** Aircraft components must be inspected regularly for fatigue cracks caused by the constant cycle of pressurization and flight loads.

**ae-60. The speed at which an aircraft can rotate during takeoff is designated as:**
- A) $V_1$
- **B) $V_r$**
- C) $V_2$
- D) $V_{so}$
- **Rationale:** $V_r$ is the speed at which the pilot pulls back on the stick to lift the nose wheel off the ground.

**ae-61. A "Scramjet" engine differs from a Ramjet because:**
- **A) Combustion occurs in supersonic airflow.**
- B) It has a compressor.
- C) It uses liquid oxygen.
- D) It only works at low altitudes.
- **Rationale:** Supersonic Combustion Ramjets (Scramjets) allow for flight at hypersonic speeds (Mach 5+).

**ae-62. "Phugoid" is a long-period oscillation involving changes in:**
- **A) Pitch, speed, and altitude.**
- B) Roll and yaw.
- C) Thrust and drag.
- D) Flap settings.
- **Rationale:** It is a longitudinal stability mode where the aircraft trades potential energy (altitude) for kinetic energy (speed) in a slow "wave" motion.

**ae-63. The "Load Factor" (n) is defined as the ratio of:**
- **A) Lift to Weight ($L/W$).**
- B) Thrust to Drag ($T/D$).
- C) Weight to Surface Area ($W/S$).
- D) Speed to Sound ($v/a$).
- **Rationale:** In a steady level turn, the load factor increases, making the aircraft feel "heavier."

**ae-64. Which of the following reduces "Skin Friction Drag"?**
- A) Rougher surface.
- **B) Laminar flow control.**
- C) Increasing the wing area.
- D) Flying at lower altitudes.
- **Rationale:** Keeping the boundary layer laminar for as long as possible reduces the friction between the air and the aircraft skin.



**ae-65. "Vortex Generators" are small fins on a wing used to:**
- A) Increase drag.
- **B) Delay boundary layer separation.**
- C) Increase fuel capacity.
- D) Silence engine noise.
- **Rationale:** They create small vortices that re-energize the boundary layer with high-energy air from the free stream, preventing stalls at lower speeds.

**ae-66. The "Dead Creek" or "Buffet" felt by a pilot near the stall is caused by:**
- **A) Turbulent air hitting the tail.**
- B) Engine vibration.
- C) Retracting the landing gear.
- D) Exceeding the speed of sound.
- **Rationale:** As airflow separates from the wing, the resulting turbulence strikes the horizontal stabilizer, causing the airframe to vibrate.

**ae-67. What is the function of an "Intercooler" in a turbocharged engine?**
- A) To cool the exhaust.
- **B) To cool the compressed intake air to increase its density.**
- C) To heat the cabin.
- D) To prevent engine icing.
- **Rationale:** Compressing air makes it hot; cooling it down before it enters the cylinders allows more oxygen to fit in, increasing power.

**ae-68. "Aeroelasticity" is the study of the interaction between:**
- **A) Aerodynamic, inertial, and elastic forces.**
- B) Pilot behavior and flight controls.
- C) Engines and fuel.
- D) Air density and temperature.
- **Rationale:** It deals with how flexible structures (like wings) deform under aerodynamic loads.

**ae-69. The "Coanda Effect" describes the tendency of a fluid jet to:**
- **A) Stay attached to a convex surface.**
- B) Reflect off a surface.
- C) Stop flowing in a vacuum.
- D) Heat up when compressed.
- **Rationale:** This effect is used in some specialized aircraft to increase lift by blowing engine air over the upper surface of the wing.

**ae-70. Which speed is known as the "Takeoff Safety Speed"?**
- A) $V_1$
- B) $V_r$
- **C) $V_2$**
- D) $V_{ne}$
- **Rationale:** $V_2$ is the minimum speed that must be maintained until a safe height is reached if an engine fails after takeoff.

**ae-71. "Nacelles" are the structures that:**
- A) Hold the passengers.
- B) Control the rudder.
- **C) House the engines.**
- D) Connect the wings to the fuselage.
- **Rationale:** Engine nacelles are aerodynamically shaped to minimize drag while protecting the propulsion system.

**ae-72. The "Neutral Point" of an aircraft is the CG location where:**
- **A) Longitudinal stability is zero (neutral).**
- B) The aircraft is most stable.
- C) Lift equals zero.
- D) The aircraft cannot take off.
- **Rationale:** If the CG is at the neutral point, the aircraft will not return to its original pitch after a disturbance.

**ae-73. What does "Feathering" a propeller mean?**
- A) Painting it to reduce drag.
- **B) Turning the blades parallel to the airflow to stop rotation and reduce drag.**
- C) Increasing the RPM to maximum.
- D) Removing the propeller from the engine.
- **Rationale:** This is done after an engine failure in flight to prevent the propeller from "windmilling" and creating excessive drag.

**ae-74. The "Stagnation Point" on a wing is where:**
- **A) The air velocity is zero relative to the wing.**
- B) The pressure is at its minimum.
- C) Lift is generated.
- D) Turbulence begins.
- **Rationale:** This occurs at the leading edge where the flow divides between the upper and lower surfaces.

**ae-75. "Composite Materials" (like Carbon Fiber) are preferred in modern aerospace because of:**
- A) Low cost.
- **B) High strength-to-weight ratio.**
- C) Ease of repair.
- D) High electrical conductivity.
- **Rationale:** Composites allow for lighter, stronger airframes, which improves fuel efficiency and range.

<div style="page-break-after: always;"></div>

# ✈️ Aero Engineering IV: Materials & Fatigue

**ae-76. Which material property is defined as the ability to absorb energy and deform plastically before fracturing?**
* A) Hardness
* **B) Toughness**
* C) Stiffness
* D) Elasticity
* **Rationale:** Toughness is a critical property for aerospace structures as it represents a material's resistance to fracture and its ability to handle impact energy. It is measured as the total area under the stress-strain curve.


**ae-77. What is the primary disadvantage of using high-strength Aluminum alloys like 7075-T6?**
* A) High density
* B) Low stiffness
* **C) Susceptibility to stress corrosion cracking**
* D) Poor thermal conductivity
* **Rationale:** While 7075-T6 offers excellent strength-to-weight ratios, it is prone to corrosion, especially under stress, requiring careful surface treatment and regular inspections.

**ae-78. In composite laminates, 'Delamination' refers to:**
* A) The breaking of fibers
* **B) The separation of individual layers or plies**
* C) The melting of the resin
* D) The evaporation of the core
* **Rationale:** Delamination is a common failure mode in composites where the bond between layers fails, often due to impact or manufacturing defects, significantly reducing structural integrity.


**ae-79. Which structural concept uses a series of closely spaced frames and stringers to support the skin?**
* A) Warped wing
* **B) Semi-monocoque**
* C) Truss-mount
* D) Pratt truss
* **Rationale:** The semi-monocoque design is the standard for modern aircraft, distributing loads between the skin and internal longitudinal (stringers) and transverse (frames) members.

**ae-80. What is the 'Fatigue Limit' or 'Endurance Limit' of a material?**
* A) The maximum load it can carry once
* **B) The stress level below which an infinite number of cycles can be applied without failure**
* C) The temperature at which it melts
* D) The speed of sound in the material
* **Rationale:** For materials like certain steels, if the cyclic stress amplitude remains below this limit, the component is theoretically safe from fatigue failure indefinitely.


**ae-81. What is the main role of 'Titanium' alloys in aerospace structures?**
* A) Used only for interior decoration
* **B) Used in high-temperature areas and where high corrosion resistance is needed**
* C) To replace all aluminum due to low cost
* D) Only for landing gear tires
* **Rationale:** Titanium provides excellent strength at high temperatures (e.g., near engines) and has superior corrosion resistance, though it is expensive and difficult to machine.

**ae-82. In the context of 'Damage Tolerance', what is the 'Critical Crack Length'?**
* A) The length of the wing
* **B) The crack size at which the structure will fail catastrophically under a specific load**
* C) The thickness of the skin
* D) The length of a rivet
* **Rationale:** Damage tolerance philosophy assumes cracks will exist; the goal is to ensure they are detected before they reach the critical length where rapid fracture occurs.

**ae-83. Which type of load induces 'Buckling' in thin-walled structures like aircraft skin?**
* A) Tension
* **B) Compression**
* C) Torsion
* D) Internal Pressure
* **Rationale:** Buckling is a failure of stability. Thin plates under compression can fail by bowing outward or inward long before the material reaches its yield strength.

**ae-84. What is the purpose of 'Shot Peening' a metal component?**
* A) To make it shinier
* **B) To introduce compressive residual stresses and improve fatigue life**
* C) To increase its weight
* D) To make it easier to weld
* **Rationale:** By bombarding the surface with small spheres, a layer of compressive stress is created that helps prevent the initiation of fatigue cracks.

**ae-85. In a fuselage subjected to internal pressurization, which stress is typically twice the magnitude of the longitudinal stress?**
* A) Bending stress
* **B) Hoop (Circumferential) stress**
* C) Shear stress
* D) Thermal stress
* **Rationale:** In a thin-walled pressure vessel, the hoop stress ($\sigma_\theta = \frac{Pr}{t}$) acting around the circumference is twice as high as the longitudinal stress ($\sigma_L = \frac{Pr}{2t}$).

**ae-86. Which material is most commonly used for the 'Core' of a sandwich structure?**
* A) Solid Steel
* **B) Aluminum Honeycomb or Foam**
* C) Lead
* D) Rubber
* **Rationale:** Honeycomb structures provide extremely high stiffness-to-weight ratios by keeping the two load-bearing skins apart with minimal mass.

**ae-87. What is 'Creep' in material science?**
* A) The sound a wing makes
* **B) Slow, permanent deformation under a constant load over a long period**
* C) Rapid fracture
* D) Surface rust
* **Rationale:** Creep is critical in high-temperature components like turbine blades where constant centrifugal loads cause materials to slowly stretch.

**ae-88. What does 'S-N Curve' represent in structural analysis?**
* A) Speed vs. Noise
* **B) Stress amplitude ($S$) vs. Number of cycles to failure ($N$)**
* C) Stability vs. Neutral point
* D) Stiffness vs. Normal load
* **Rationale:** The S-N curve is the fundamental tool for predicting the fatigue life of a material under cyclic loading.

**ae-89. Why is 'Galvanic Corrosion' a major concern when joining Carbon Fiber to Aluminum?**
* A) Carbon fiber melts aluminum
* **B) The two materials have a high electrochemical potential difference**
* C) The aluminum becomes too stiff
* D) It causes the composite to catch fire
* **Rationale:** Carbon fiber is electrically conductive. In a moist environment, it acts as a cathode and causes the aluminum (anode) to corrode rapidly.

**ae-90. The 'Neutral Axis' of a beam in bending is the location where:**
* A) The stress is maximum
* **B) The stress is zero**
* C) The beam breaks first
* D) The weight is concentrated
* **Rationale:** During bending, one side is in tension and the other in compression. The neutral axis is the plane where there is no longitudinal stress.


**ae-91. In a wing structure, 'D-box' skins are primarily used to resist:**
* A) Vertical lift
* **B) Drag and Torsional loads**
* C) Gravity
* D) Passenger weight
* **Rationale:** The D-box (the section forward of the front spar) provides the necessary torsional stiffness to prevent the wing from twisting excessively.

**ae-92. What is the primary benefit of 'Cold Working' a metal?**
* A) Increasing its ductility
* **B) Increasing its yield strength through strain hardening**
* C) Decreasing its density
* D) Making it transparent
* **Rationale:** Cold working increases the dislocation density within the metal, making it harder and stronger, though less ductile.

**ae-93. Which type of inspection is most effective for finding internal cracks in thick wing spars?**
* A) Visual inspection
* **B) Ultrasonic or X-ray testing**
* C) Tap testing
* D) Smell
* **Rationale:** Non-destructive testing (NDT) like Ultrasound or Radiography is essential for identifying sub-surface defects invisible to the eye.

**ae-94. What is the function of 'Intercostals' in an aircraft structure?**
* A) To provide oxygen
* **B) Short longitudinal members that provide local stiffening between frames**
* C) To connect the engines
* D) To move the ailerons
* **Rationale:** Intercostals are used to reinforce specific areas of the skin or to transfer loads between primary structural members.

**ae-95. In the 'V-n diagram', what defines the 'Never Exceed Speed' ($V_{ne}$)?**
* A) Engine power
* **B) Structural integrity and aerodynamic flutter limits**
* C) Fuel capacity
* D) Maximum altitude
* **Rationale:** $V_{ne}$ is the absolute speed limit; beyond this, the aircraft risks catastrophic structural failure or uncontrollable flutter oscillations.

**ae-96. What is 'Brittle Fracture'?**
* A) Slow cracking with lots of deformation
* **B) Sudden failure with little to no plastic deformation**
* C) Melting of the material
* D) Formation of rust
* **Rationale:** Brittle fractures are dangerous because they occur suddenly without the warning of visible stretching or deformation.

**ae-97. Which design approach focuses on ensuring that a crack will not grow to critical size between inspection intervals?**
* A) Safe-Life
* **B) Damage Tolerance**
* C) Ultimate Load
* D) Infinite Life
* **Rationale:** Damage tolerance relies on the fact that cracks will be caught during inspections while they are still small enough for the structure to remain safe.

**ae-98. What is the primary load carried by the 'Skin' of a pressurized fuselage?**
* A) Bending
* **B) Tension (Hoop and Longitudinal)**
* C) Compression
* D) None
* **Rationale:** The skin of a pressurized aircraft acts like a pressure vessel, carrying significant tensile loads to contain the internal air.

**ae-99. What is 'Aeroelasticity'?**
* A) The study of air density
* **B) The interaction between aerodynamic forces and structural flexibility**
* C) The study of rubber materials
* D) Propeller design
* **Rationale:** Aeroelasticity covers phenomena like flutter, where the interaction between airflow and a flexible structure causes self-excited, destructive oscillations.

**ae-100. Which of the following is a 'Secondary Structure'?**
* A) Main wing spar
* B) Fuselage bulkhead
* **C) Fairings and minor access panels**
* D) Landing gear beam
* **Rationale:** Secondary structures provide aerodynamic shape or protection but are not essential for the primary load-carrying capability of the aircraft.

<div style="page-break-after: always;"></div>