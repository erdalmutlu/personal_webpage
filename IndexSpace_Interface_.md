# IndexSpace and Tiling Specification
  
  
## Notation
  
  
- **IndexRange** is set of values, <img src="https://latex.codecogs.com/gif.latex?IR%20=%20&#x5C;{p_0,p_1...p_n&#x5C;}%20&#x5C;mid%20&#x5C;forall%20i%20&#x5C;in%20&#x5C;{0,1...n&#x5C;},%20p_i%20&#x5C;in%20&#x5C;mathbb{Z}^+%20&#x5C;cup%20&#x5C;{0&#x5C;}"/> and <img src="https://latex.codecogs.com/gif.latex?p_i%20&#x5C;leq%20p_{i+1}"/>. It is a map from positions to indices. 
- **IndexSpace** is union of **IndexRange** values, <img src="https://latex.codecogs.com/gif.latex?IS%20%20=%20IR_0%20&#x5C;cup%20IR_1%20&#x5C;cup...%20&#x5C;cup%20IR_n%20&#x5C;mid%20&#x5C;forall%20i,%20j,%20i%20&#x5C;neq%20j,%20IR_i%20&#x5C;cap%20IR_j%20=%20&#x5C;emptyset"/>. It is a map from positions to indices.
- **SubIndexSpace** of an **IndexSpace**, <img src="https://latex.codecogs.com/gif.latex?Sub(IS)"/>, is union of subsets of **IndexRange**s, <img src="https://latex.codecogs.com/gif.latex?Sub(IS)%20=%20Sub(IR_0)%20&#x5C;cup%20Sub(IR_1)%20&#x5C;cup%20...%20&#x5C;cup%20Sub(IR_n)%20&#x5C;mid%20&#x5C;forall%20i,%20Sub(IR_i)%20&#x5C;subseteq%20IR_i"/>. It is map from positions to indices. 
- **Tiling** of an **IndexSpace**, <img src="https://latex.codecogs.com/gif.latex?Tiling(IS)"/>, is a union of tiled version of **IndexRange**s, <img src="https://latex.codecogs.com/gif.latex?Tiling(IS)%20=%20Tiling(IR_0)%20&#x5C;cup%20Tiling(IR_1)%20&#x5C;cup%20...%20&#x5C;cup%20Tiling(IR_n)"/>. It is map from positions to tile information which holds a map from positions to indices.
  
----
  
## TAMM Interface Procedures
  
1. Building **IndexRange**s from set of values.
    ```c++
    IndexRange ir0 = {1, 2, 3, 4};
    IndexRange ir1 = {5, 6, 7, 8};
  
    IndexRange s_ir0 = {1, 2};
    IndexRange s_ir1 = {5, 6};
    ```
2. Building **IndexSpace** and **SubIndexSpace** from given index ranges.
    ```c++
    IndexSpace IS0(ir0,ir1);
  
    SubIndexSpace S_IS0(IS0, s_ir0, s_ir1);
    ```
3. Defining a **Tiling** structure and **TiledIndexSpace**.
    ```c++
    Tile tiling;
    Tile o_tiling;
  
    TiledIndexSpace T_IS0(IS0, tiling);
    TiledIndexSpace T_SIS0(S_IS0, tiling)
  
    TiledIndexSpace To_IS0(IS0, o_tiling);
    TiledIndexSpace To_SIS0(S_IS0, o_tiling)
    ```
5. Generating **Tensor**s over different **IndexSpace** constructs
    ```c++
    // Tensor construction with IndexSpace/SubIndexSpace
    Tensor A(IS0);
    Tensor B(S_IS0);
  
    // Tensor construction with TiledIndexSpaces
    Tensor T_A(T_IS0);
    Tensor T_B(T_SIS0);
  
    Tensor To_A(To_IS0);
    Tensor To_B(To_SIS0);
    ```
6. Assignments between **Tensor**s.
    - Tensor assignment between compatible **IndexSpace**. The assignment will check if the index ranges are compatible by checking their **IndexSpace**s
      ```c++
      // Valid assignment as B is composed of index ranges that
      // are subset of A's index ranges.
      A[s_ir0] = B[s_ir0];
  
      // Invalid assignment as B doesn't include corresponding 
      // index range
      B[ir0] = A[ir0];
      ```
    - Tensor assignment between different index ranges. 
  