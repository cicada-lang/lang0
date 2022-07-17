import { run } from "../run"

const code = `
(define true (lambda (t f) t))
(define false (lambda (t f) f))

(define if (lambda (p t f) (p t f)))

(define and (lambda (x y) (if x y false)))
(define or (lambda (x y) (if x true y)))
(define not (lambda (x) (if x false true)))

(if true true false)
true

(assert-equal
  (if true true false)
  true)

(assert-equal
  (if false false true)
  false)

(if true false true)

;; (if true true)
;; (if true)
`

run(code)
