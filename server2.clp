;;; Неисправности микроволновки

(defclass Malifunction
	(is-a USER)
	(role concrete)
	(slot Value)
)

(defclass DoesNotWork
	(is-a Malifunction)
)

(defclass DoesNotHeatUp
	(is-a Malifunction)
)

(defclass HasNoise
	(is-a Malifunction)
)

;;; Причины неисправностей

(defclass Reason
	(is-a USER)
	(role concrete)
	(slot Value)
)

(defclass NoPower
	(is-a Reason)
)

(defclass BrokenFuse
	(is-a Reason)
)

(defclass BroeknSocket
	(is-a Reason)
)

(defclass DoorNotClosed
	(is-a Reason)
)

(defclass BrokenDoorLatches
	(is-a Reason)
)

(defclass Pollution
	(is-a Reason)
)

;;; Работы по неисправностям

(defclass Work
  (is-a USER)
  (role concrete)
  (slot Done)
)

(defclass ConnectPower
  (is-a Work)
)

(defclass ReplaceFuse
  (is-a Work)
)

(defclass FixSocket
  (is-a Work)
)

(defclass CloseDoor
  (is-a Work)
)

(defclass ReplaceDoorLatches
  (is-a Work)
)

(defclass CleanPollution
  (is-a Work)
)

;;; Начальные состояния - их мы будем задавать программно (из js или php)

(definstances Malifunctions

(hasNoise of HasNoise (Value yes)))

;;; Правила

(defrule does-not-work-solution
  ?work <- (object (is-a DoesNotWork) (Value yes))
=>
	(make-instance (gensym) of ConnectPower (Done no))
	(make-instance (gensym) of ReplaceFuse (Done no))
	(make-instance (gensym) of FixSocket (Done no))
	(save-instances "1.fct")
)

(defrule does-not-heat-up-solution
  (object (is-a DoesNotHeatUp) (Value yes))
=>
	(make-instance (gensym) of CloseDoor (Done no))
	(make-instance (gensym) of ReplaceDoorLatches (Done no))
	(save-instances "1.fct")
)

(defrule has-noise-solution
  (object (is-a HasNoise) (Value yes))
=>
	(make-instance (gensym) of CleanPollution (Done no))
	(save-instances "1.fct")
)