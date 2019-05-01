/** animation Trigger Meta Data Import */
import { animate, style, transition, trigger } from '@angular/animations';

/** Silder animation of List of vacancy */
export const  VacancyAnimation = {
        cardAnimation : trigger('vacancyAnimation', [
                  transition(
                      'void => prev', [ // --- Entering --->
                        // In order to maintain a zIndex of 2 throughout the ENTIRE
                        // animation (but not after the animation), we have to define it
                        // in both the initial and target styles. Unfortunately, this
                        // means that we ALSO have to define target values for the rest
                        // of the styles, which we wouldn't normally have to.
                        style({left: -100, opacity: 0, zIndex: 2 }),
                        animate('250ms ease-in-out', style({ left: 0, opacity: 1, zIndex: 2 }),
                        ),
                    ],
                  ),
                  transition('prev => void', [
                          animate('250ms ease-in-out', style({ left: +100, opacity: 0 }),
                          )],
                  ),
                  transition(
                      'void => next', // <--- Entering <---
                      [
                          // In order to maintain a zIndex of 2 throughout the ENTIRE
                          // animation (but not after the animation), we have to define it
                          // in both the initial and target styles. Unfortunately, this
                          // means that we ALSO have to define target values for the rest
                          // of the styles, which we wouldn't normally have to.
                          style({left: 100, opacity: 0, zIndex: 2 }),
                          animate('250ms ease-in-out', style({ left: 0, opacity: 1, zIndex: 2 }),
                          )],
                  ),
                  transition( 'next => void', [ // <--- Leaving <---
                            animate('250ms ease-in-out', style({ left: -100, opacity: 0 }),
                          )],
                  ),
              ]),
    };
