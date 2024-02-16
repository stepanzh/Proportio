function copyToClipboard(text, onSuccess = undefined, onFailure = undefined) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      if (onSuccess === undefined){
        console.log('clipboard success');
        return;
      }
      onSuccess();
    })
    .catch((e) => {
      if (onFailure === undefined){
        console.log('clipboard failed\n' + e);
        return;
      }
      onFailure(e);
    });
}

function getFirstClassElement(root, class_name){
  let elements = root.getElementsByClassName(class_name);
  if (elements.length != 1){
    return undefined;
  }
  return elements[0];
}

function attachCopyEvent(copy_button){
  let input = getFirstClassElement(copy_button, 'cp-btn-text-to-copy');
  if (input === undefined){
    console.error('Exactly one input required. Check HTML/CSS.');
    return false;
  }
  let text_to_copy = input.value;

  let action_copy = getFirstClassElement(copy_button, 'cp-btn-cp-action');
  if (action_copy === undefined){
    console.error('Exactly one copy button required. Check HTML/CSS.');
    return false;
  }

  let icon_act = getFirstClassElement(action_copy, 'action-icon-act');
  if (icon_act === undefined){
    console.error('Exactly one act icon required. Check HTML/CSS.');
    return false;
  }

  let icon_done = getFirstClassElement(action_copy, 'action-icon-done');
  if (icon_done === undefined){
    console.error('Exactly one done icon required. Check HTML/CSS.');
    return false;
  }

  let icon_error = getFirstClassElement(action_copy, 'action-icon-error');
  if (icon_error === undefined){
    console.error('Exactly one error icon required. Check HTML/CSS.');
    return false;
  }

  action_copy.addEventListener('click', function (){
    let show = (x) => { x.style.display = 'inline' };
    let hide = (x) => { x.style.display = 'none' };

    let show_time_milliseconds = 3000;
    copyToClipboard(text_to_copy,
      function(){
        console.debug('Successfull copy.');

        hide(icon_act);
        show(icon_done);

        setTimeout(() => {
          show(icon_act);
          hide(icon_done);
        }, show_time_milliseconds);
      },
      function(){
        console.debug('Error during copy.');

        hide(icon_act);
        show(icon_error);

        setTimeout(() => {
          show(icon_act);
          hide(icon_error);
        }, show_time_milliseconds);
      }
    );
  });

  return true;
}

function main(){
  var copy_buttons = document.getElementsByClassName('cp-btn');
  for (var i = 0; i < copy_buttons.length; i++){
    attachCopyEvent(copy_buttons[i]);
  }
}

document.addEventListener('DOMContentLoaded', main);
